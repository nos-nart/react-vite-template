import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { response, rest } from 'msw';

import { encodeToken, delayedResponse } from './auth';
import { db } from './db';

// type PostBody = {
//   id: string
//   authorId: string
//   title: string
// }

type Login = {
  email: string;
  password: string;
};

type Register = {
  name: string;
  email: string;
  password: string;
};

export const handlers = [
  // Create REST API request handlers based on
  // the "task" database model.
  ...db.task.toHandlers('rest'),
  // rest.post<PostBody>("/posts", (req, res, ctx) => {
  //   if (req.headers.get("authorization") === "Bearer AUTH_TOKEN") {
  //     return res(ctx.status(403));
  //   }

  //   const postObject = req.body;
  //   const existingPost = db.post.findFirst({
  //     where: {
  //       id: {
  //         equals: postObject.id,
  //       },
  //     },
  //   });

  //   if (existingPost) {
  //     throw new Error("The post already exists");
  //   }

  //   const newPost = db.post.create(req.body);

  //   return res(ctx.status(201), ctx.json({ post: newPost }));
  // }),
  rest.post<Login>('/user/login', (req, res, ctx) => {
    const { email, password } = req.body;

    // @NOTE: validate
    const user = db.user.findFirst({ where: { email: { equals: email } } });

    if (!user || password !== user.password) {
      return response(
        ctx.status(StatusCodes.UNAUTHORIZED),
        ctx.json({
          statusCode: StatusCodes.UNAUTHORIZED,
          error: ReasonPhrases.UNAUTHORIZED,
          message: 'Incorrect credentials',
        })
      );
    }

    const token = encodeToken(user);
    return delayedResponse(
      ctx.set('Authorization', `Bearer ${token}`),
      ctx.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
      }),
      ctx.json({
        token,
        user: {
          ...user,
          password: undefined,
        },
      })
    );
  }),
  rest.post<Register>('/user/register', (req, res, ctx) => {
    const { name, email, password } = req.body;

    const { password: _, ...user } = db.user.create({
      name,
      email: email.trim().toLowerCase(),
      password,
    });
    const token = encodeToken(user);

    return delayedResponse(
      ctx.status(StatusCodes.ACCEPTED),
      ctx.set('Authorization', `Bearer ${token}`),
      ctx.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
      }),
      ctx.json({ token, user })
    );
  }),
];
