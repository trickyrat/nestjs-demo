import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        const cookie = request.cookies['jwtCookie'];
        if (!cookie) {
          return "";
        }
        const tokens = cookie.split(";");
        const token = tokens[0];
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      //secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    let isExist = await this.userService.checkUserExist(payload.username);
    if (!isExist) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}