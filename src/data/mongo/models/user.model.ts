import mongoose, { Document, Schema, Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import validator from 'validator';

// Define UserOptions interface
interface UserOptions {
	name: string;
	email: string;
	password: string;
	photo?: string;
	passwordConfirm: string | undefined;
	createdAt: Date;
}

// Define UserDocument interface by extending mongoose.Document
interface UserDocument extends Document, UserOptions {
	correctPassword(
		candidatePassword: string,
		userPassword: string
	): Promise<boolean>;
}

// Define UserModel interface by extending mongoose.Model and providing generics
interface UserModel extends Model<UserDocument> {
	// Define any static methods here if needed
}

// Define user schema
const userSchema = new Schema<UserDocument>({
	name: {
		type: String,
		required: [true, 'The user must have a name'],
		trim: true,
		maxLength: [40, 'An user name must have less than 41 characters'],
		minLength: [5, 'An user name must be longer than 10 characters'],
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, 'An user must have an email'],
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	photo: {
		type: String,
	},
	password: {
		type: String,
		maxLength: [12, 'An user password must have less than 12 characters'],
		minLength: [5, 'An user password must be longer than 8 characters'],
		required: [true, 'An user must have a password'],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			validator: function (this: UserDocument) {
				return this.passwordConfirm === this.password;
			},
			message: 'Password and Confirm password did not match',
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Define pre-save hook to hash password
userSchema.pre<UserDocument>('save', async function (next) {
	// Only run if password was modified
	if (!this.isModified('password')) return next();

	// Encrypt password on the database
	this.password = await hash(this.password, 10);
	// Delete the password confirm
	this.passwordConfirm = undefined;
	next();
});

// Define correctPassword method
userSchema.methods.correctPassword = async function (
	candidatePassword: string,
	userPassword: string
) {
	return await compare(candidatePassword, userPassword);
};

// Define UserModel
export const UserModel: UserModel = mongoose.model<UserDocument, UserModel>(
	'User',
	userSchema
);
