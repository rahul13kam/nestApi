import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from '../users/dto/register.dto';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()


export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    // check if email already exists
    const userExist = await this.userRepository.findOne({ where: { email } });
    if (userExist) {
      throw new BadRequestException('Email already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    await this.userRepository.save(user);

    // create JWT payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // generate token
    const token = this.jwtService.sign(payload);

    return {
      message: 'User registered successfully',
      access_token: token,
    };
    }

  
   // Add below register()
async login(email: string, password: string) {
  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) throw new UnauthorizedException('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new UnauthorizedException('Invalid email or password');

  const payload = { id: user.id, email: user.email, role: user.role };
  const token = this.jwtService.sign(payload);

  return { message: 'Login successful', access_token: token };
}

}