// import { Injectable, NestMiddleware } from '@nestjs/common';
//
// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void): any {
//     //console.log('Request', req);
//     const { token } = getJWTTokenFromHeader(req);
//
//     let payload: JWTPayload;
//     try {
//       payload = jwtProcessor.verify(token);
//       SessionIdentityMiddleware.setSessionJwtPayload(request, payload);
//     } catch (error) {
//       return next();
//     }
//   }
// }
//
// export function getJWTTokenFromHeader(
//   request: Request,
// ): {
//   header?: string;
//   token?: string;
// } {
//   const header = request.get('Authorization');
//   let token: string | undefined;
//   if (header) {
//     token = extractJWT(header);
//   }
//
//   return {
//     header,
//     token,
//   };
// }
//
// export function extractJWT(header: string): string | undefined {
//   let token: string | undefined;
//
//   if (header.includes('JWT')) {
//     token = header.slice(4);
//   }
//
//   if (header.includes('Bearer')) {
//     token = header.slice(7);
//   }
//
//   return token;
// }