import {prismaMock} from '@/lib/singleton';
import * as utils from '../../utils/userSession';

jest.mock('next-auth/next', () => ({
    getServerSession: jest.fn()
}));

jest.mock('@/lib/db', () => ({
    todo: {
        findUnique: jest.fn()
    },
    todoList: {
        findUnique: jest.fn()
    }
}));

afterEach(() => {
    jest.resetAllMocks();
});

describe('validateSession', () => {
    it('should return user object on valid session', async () => {
        const mockedGetServerSession = require('next-auth/next').getServerSession;
        mockedGetServerSession.mockResolvedValueOnce({user: {name: 'Test User'}});
    });
    it('should return null on invalid session', async () => {
        const mockedGetServerSession = require('next-auth/next').getServerSession;
        mockedGetServerSession.mockResolvedValueOnce(null);

        const result = await utils.validateSession();

        expect(result).toBeNull();


    });
});

describe('hasAccessToTodo', () => {

    it('should return false if user does not have access to todo', async () => {
        const todoId = 1;
        const userId = 1;

        prismaMock.todo.findUnique.mockResolvedValueOnce({
            id: 1,
            text: 'Test Todo',
            listId: 1,
            isCompleted: false,
            createdAt: new Date(),
        });

        const result = await utils.hasAccessToTodo(
            userId,
            todoId
        );

        expect(result).toBeFalsy();
        expect(prismaMock.todo.findUnique).toBeCalledTimes(1);
        expect(prismaMock.todo.findUnique).toBeCalledWith({
            where: {id: todoId},
            include: {list: true}
        });
    });
    it('should return false if todo does not exist', async () => {
        const todoId = 1;
        const userId = 1;

        prismaMock.todo.findUnique.mockResolvedValueOnce(null);

        const result = await utils.hasAccessToTodo(
            userId,
            todoId
        );

        expect(result).toBeFalsy();
        expect(prismaMock.todo.findUnique).toBeCalledTimes(1);
        expect(prismaMock.todo.findUnique).toBeCalledWith({
            where: {id: todoId},
            include: {list: true}
        });
    });
});

describe('hasAccessToList', () => {
    it('should return true if user has access to list', async () => {
        const listId = 1;
        const userId = 1;

        prismaMock.todoList.findUnique.mockResolvedValueOnce({
            id: listId,
            title: 'Test List',
            userId: userId
        });

        const result = await utils.hasAccessToList(
            userId,
            listId
        );

        expect(result).toBeTruthy();
        expect(prismaMock.todoList.findUnique).toBeCalledTimes(1);
        expect(prismaMock.todoList.findUnique).toBeCalledWith({
            where: {id: listId},
        });
    });
    it('should return false if user does not have access to list', async () => {
        const listId = 1;
        const userId = 1;

        prismaMock.todoList.findUnique.mockResolvedValueOnce({
            id: listId,
            title: 'Test List',
            userId: userId + 1
        });

        const result = await utils.hasAccessToList(
            userId,
            listId
        );

        expect(result).toBeFalsy();
        expect(prismaMock.todoList.findUnique).toBeCalledTimes(1);
        expect(prismaMock.todoList.findUnique).toBeCalledWith({
            where: {id: listId},
        });
    });
    it('should return false if list does not exist', async () => {
        const listId = 1;
        const userId = 1;

        prismaMock.todoList.findUnique.mockResolvedValueOnce(null);

        const result = await utils.hasAccessToList(
            userId,
            listId
        );

        expect(result).toBeFalsy();
        expect(prismaMock.todoList.findUnique).toBeCalledTimes(1);
        expect(prismaMock.todoList.findUnique).toBeCalledWith({
            where: {id: listId},
        });
    });
});



