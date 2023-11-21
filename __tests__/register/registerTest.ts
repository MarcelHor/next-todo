import {registerUser} from '@/app/api/auth/register/registerController';
import {prismaMock} from '@/lib/singleton';

describe('registerUser', () => {
    it('should register a new user', async () => {
        const reqBody = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
        };

        // Set up the mock behavior
        prismaMock.user.findFirst.mockResolvedValue(null);
        prismaMock.user.create.mockResolvedValue({
            id: 1,
            ...reqBody,
        });

        const result = await registerUser(reqBody);

        expect(result).toEqual({message: "User registered."});
        expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
            where: {email: reqBody.email},
        });
        expect(prismaMock.user.create).toHaveBeenCalled();
    });
    it('throws an error if user already exists', async () => {
        const reqBody = {
            name: 'Existing User',
            email: 'existuser@example.com',
            password: 'password123',
            confirmPassword: 'password123',
        };

        prismaMock.user.findFirst.mockResolvedValue({
            id: 2,
            name: reqBody.name,
            email: reqBody.email,
            password: 'hashedpassword',
        });

        await expect(registerUser(reqBody)).rejects.toThrow("User already exists.");
    });
    it('throws an error if the input validation fails (e.g., missing email)', async () => {
        const reqBody = {
            name: 'Test User',
            password: 'password123',
            confirmPassword: 'password123',
        };

        await expect(registerUser(reqBody)).rejects.toThrow("The \"email\" field is required.");
    });
    it('throws an error if the name is too short', async () => {
        const reqBody = {
            name: 'Te',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
        };

        await expect(registerUser(reqBody)).rejects.toThrow("The \"name\" field must be at least 3 characters long.");
    });
    it('throws an error if the name is too long', async () => {
        const reqBody = {
            name: 'TEIOASNMDIOMSANIDONAS ION IDOASN IODAAM I IOMSAI MAS IDSA DS 58189148914896148974',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
        };

        await expect(registerUser(reqBody)).rejects.toThrow( "The \"name\" field must be less than or equal to 20 characters long.");

    });
});