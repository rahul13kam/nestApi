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
  const { name, email, password, role } = registerDto;

  // 1️⃣ Check if email already exists
  const existingUser = await this.userRepository.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new BadRequestException('Email already exists');
  }

  // 2️⃣ Prevent creating admin via API
  if (role === 'admin') {
    throw new BadRequestException('Cannot register as admin');
  }

  // 3️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4️⃣ Set default role
  const userRole = role || 'candidate';

  // 5️⃣ Create user entity
  const user = this.userRepository.create({
    name,
    email,
    password: hashedPassword,
    role: userRole,
  });

  // 6️⃣ Save to database
  await this.userRepository.save(user);

  // 7️⃣ Create JWT payload
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  // 8️⃣ Generate token
  const accessToken = this.jwtService.sign(payload);

  // 9️⃣ Return response (never return password)
  return {
    message: 'User registered successfully',
    access_token: accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

  
   // Add below register()
async login(email: string, password: string) {
  const user = await this.userRepository.findOne({ where: { email } });

  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // ✅ ROLE INCLUDED HERE
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = this.jwtService.sign(payload);

  return {
    message: 'Login successful',
    access_token: token,
  };
}

}