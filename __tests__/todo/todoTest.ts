import {prismaMock} from '@/lib/singleton';
import * as todoController from '../../app/api/todo-list/[todo]/todoController';
import * as utils from '../../utils/userSession';


describe('getTodos', () => {
    it('should return todos', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToList').mockResolvedValue(true);

        const listId = 1;
        const todos = [
            {
                id: 1,
                text: 'Test Todo',
                listId: listId,
                isCompleted: false,
                createdAt: new Date(),
            },
        ];

        prismaMock.todo.findMany.mockResolvedValueOnce(todos);

        const result = await todoController.getTodos(listId);

        expect(result).toEqual(todos);
        expect(prismaMock.todo.findMany).toBeCalledTimes(1);
        expect(prismaMock.todo.findMany).toBeCalledWith({where: {listId: listId}});
    });
    it('should throw an error if user is not logged in', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue(null);

        const listId = 1;

        await expect(todoController.getTodos(listId)).rejects.toThrow('Unauthorized');
        expect(prismaMock.todo.findMany).not.toBeCalled();
    });
    it('should throw an error if user does not have access to the list', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToList').mockResolvedValue(false);

        const listId = 1;

        await expect(todoController.getTodos(listId)).rejects.toThrow('Unauthorized');
        expect(prismaMock.todo.findMany).not.toBeCalled();
    });
});

describe('createTodo', () => {
    it('should create a todo', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToList').mockResolvedValue(true);

        const listId = 1;
        const text = 'New Todo';

        prismaMock.todo.create.mockResolvedValueOnce({
            id: 1,
            text: text,
            listId: listId,
            isCompleted: false,
            createdAt: new Date()
        });

        const result = await todoController.createTodo(listId, text);

        expect(result).toEqual({message: "Todo created."});
        expect(prismaMock.todo.create).toBeCalledWith({
            data: {
                text: text,
                listId: listId,
                isCompleted: false
            }
        });
    });
    it('should throw an error if user is not logged in', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue(null);

        const listId = 1;
        const text = 'New Todo';

        await expect(todoController.createTodo(listId, text)).rejects.toThrow('Unauthorized');
        expect(prismaMock.todo.create).not.toBeCalled();
    });
    it('should throw an error if user does not have access to the list', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToList').mockResolvedValue(false);

        const listId = 1;

        await expect(todoController.createTodo(listId, 'New Todo')).rejects.toThrow('Unauthorized');
        expect(prismaMock.todo.create).not.toBeCalled();
    });
    it('should throw an error if text is not provided', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToList').mockResolvedValue(true);

        const listId = 1;

        await expect(todoController.createTodo(listId, '')).rejects.toThrow('Todo text cannot be an empty field');
        expect(prismaMock.todo.create).not.toBeCalled();
    });
    it('should throw an error if no text', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToList').mockResolvedValue(true);

        const listId = 1;

        await expect(todoController.createTodo(listId, '')).rejects.toThrow('Todo text cannot be an empty field');
        expect(prismaMock.todo.create).not.toBeCalled();
    });
});


describe('deleteTodo', () => {
    it('should delete a todo', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToTodo').mockResolvedValue(true);

        const todoId = 1;

        prismaMock.todo.delete.mockResolvedValueOnce({
            id: todoId,
            text: 'Test Todo',
            listId: 1,
            isCompleted: false,
            createdAt: new Date()
        });

        const result = await todoController.deleteTodo(todoId);

        expect(result).toEqual({message: "Todo deleted."});
        expect(prismaMock.todo.delete).toBeCalledWith({where: {id: todoId}});
    });
    it('should throw an error if user is not logged in', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue(null);

        const todoId = 1;

        await expect(todoController.deleteTodo(todoId)).rejects.toThrow('Unauthorized');
        expect(prismaMock.todo.delete).not.toBeCalled();
    });
    it('should throw an error if user does not have access to the todo', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToTodo').mockResolvedValue(false);

        const todoId = 1;

        await expect(todoController.deleteTodo(todoId)).rejects.toThrow('Unauthorized');
        expect(prismaMock.todo.delete).not.toBeCalled();
    });
});

describe('updateTodo', () => {
    it('should update a todo', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToTodo').mockResolvedValue(true);

        const todoId = 1;
        const updateData = {isCompleted: true, text: 'Updated Todo'};

        prismaMock.todo.update.mockResolvedValueOnce({
            id: todoId,
            text: updateData.text,
            listId: 1,
            isCompleted: updateData.isCompleted,
            createdAt: new Date()
        });

        const result = await todoController.updateTodo(todoId, updateData.isCompleted, updateData.text);

        expect(result).toEqual({message: "Todo updated."});
        expect(prismaMock.todo.update).toBeCalledWith({
            where: {id: todoId},
            data: updateData
        });
    });
    it('should throw an error if user is not logged in', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue(null);

        const todoId = 1;
        const updateData = {isCompleted: true, text: 'Updated Todo'};

        await expect(todoController.updateTodo(todoId, updateData.isCompleted, updateData.text)).rejects.toThrow('Unauthorized');
        expect(prismaMock.todo.update).not.toBeCalled();
    });
    it('should throw an error if user does not have access to the todo', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToTodo').mockResolvedValue(false);

        const todoId = 1;
        const updateData = {isCompleted: true, text: 'Updated Todo'};

        await expect(todoController.updateTodo(todoId, updateData.isCompleted, updateData.text)).rejects.toThrow('Unauthorized');
        expect(prismaMock.todo.update).not.toBeCalled();
    });
    it('should throw an error if text is not provided', async () => {
        jest.spyOn(utils, 'validateSession').mockResolvedValue({id: 1, name: 'Test User', email: 'test@example.com'});
        jest.spyOn(utils, 'hasAccessToTodo').mockResolvedValue(true);

        const todoId = 1;

        await expect(todoController.updateTodo(todoId, true, '')).rejects.toThrow('Text cannot be an empty field');
        expect(prismaMock.todo.update).not.toBeCalled();
    });
});
