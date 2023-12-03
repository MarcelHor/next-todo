import {hasAccessToList, hasAccessToTodo, validateSession} from "../../utils/userSession";
import {prismaMock} from "@/lib/singleton";

jest.mock('next-auth/next', () => ({
    getServerSession: jest.fn(),
}));

describe('validateSession', () => {
    it('should return a user if session is valid', async () => {
        require('next-auth/next').getServerSession.mockResolvedValue({user: {id: 1, name: 'Test User'}});

        const result = await validateSession();
        expect(result).toEqual({id: 1, name: 'Test User'});
    });

    it('should return null if no session is found', async () => {
        require('next-auth/next').getServerSession.mockResolvedValue(null);

        const result = await validateSession();
        expect(result).toBeNull();
    });

    it('should return null if an exception occurs', async () => {
        require('next-auth/next').getServerSession.mockRejectedValue(new Error('Error'));

        const result = await validateSession();
        expect(result).toBeNull();
    });
});

jest.mock('@/lib/db', () => ({
    todo: {
        findUnique: jest.fn(),
    },
}));
//
// describe('hasAccessToTodo', () => {
//     it('should return true if user has access', async () => {
//         prismaMock.todo.findUnique.mockResolvedValue({
//             list: {
//                 listId: 1,
//                 id: 1,
//                 isCompleted: false,
//                 text: 'Test Todo',
//                 createdAt: new Date()
//             }
//         });
//
//         const result = await hasAccessToTodo(1, 1);
//         expect(result).toBe(true);
//     });
//
//     // Additional tests for other scenarios
// });
//
// jest.mock('@/lib/db', () => ({
//     todoList: {
//         findUnique: jest.fn(),
//     },
// }));
//
// describe('hasAccessToList', () => {
//     it('should return true if user has access', async () => {
//         prismaMock.todoList.findUnique.mockResolvedValue({userId: '1'});
//
//         const result = await hasAccessToList(1, 1);
//         expect(result).toBe(true);
//     });
//
//     // Additional tests for other scenarios
// });
