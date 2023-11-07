import { PrismaClient } from '@prisma/client'
import {mockReset, DeepMockProxy, mockDeep} from 'jest-mock-extended'
import prisma from './db'

// Mock PrismaClient
jest.mock('./db', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>()
}));

beforeEach(() => {
    mockReset(prismaMock);
});

// Mock PrismaClient instance
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
