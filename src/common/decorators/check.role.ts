import { SetMetadata } from '@nestjs/common';

export const RoleUser = (...role: string[]) => SetMetadata('role', role);
