import { JwtModuleOptions } from '@nestjs/jwt';

const jwtConfig: JwtModuleOptions = {
  secret: 'accountTokenSecret',
  signOptions: { expiresIn: '60s' },
};
export default jwtConfig;
