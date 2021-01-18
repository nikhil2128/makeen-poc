// import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
// import { config } from "../../ConfigService/config";
//
// export type JWTPayload = Readonly<{
//   id: string;
// }>;
//
// export class JWT {
//   sign(payload: JWTPayload): string {
//     return sign(payload, this.secret, this.signOptions);
//   }
//
//   verify(token: string): JWTPayload {
//     return verify(token, this.secret, this.verifyOptions) as JWTPayload;
//   }
//
//   constructor(options: { secret: string; signOptions: SignOptions; verifyOptions: VerifyOptions }) {
//     this.secret = options.secret;
//     this.signOptions = options.signOptions;
//     this.verifyOptions = options.verifyOptions;
//   }
//
//   private readonly signOptions: SignOptions;
//   private readonly verifyOptions: VerifyOptions;
//   private readonly secret: string;
// }
//
// export const jwtProcessor = new JWT({
//   secret: config.jwt.secret,
//   signOptions: { expiresIn: 36000 },
//   verifyOptions: {
//     // audience: "www.polarr.co",
//     // issuer: "iam.polarr.co",
//     ignoreExpiration: true,
//   },
// });
