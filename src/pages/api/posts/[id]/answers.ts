import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
    },
  });
  if (!post) return res.status(404).end();

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: Number(id),
        },
      },
      answer,
    },
  });

  try {
    await res.revalidate(`/`);
    return res.json({ ok: true, answer: newAnswer, revalidated: true });
  } catch (err) {
    return res.status(500);
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
