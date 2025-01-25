import { errors } from 'src/lib/error';
import { asyncHandler, generateToken, getEncryptedPassword, isPasswordValid } from 'src/lib/hepler';
import { UserModel } from 'src/models/UserModel';

export const addUser = async payload => {
  try {
    const userDetails = await UserModel.findByEmail(payload.email);
    if (userDetails) {
      throw errors.USER_ALREADY_EXIST();
    }
    const updatedPayload = {
      email: payload.email,
      password: await getEncryptedPassword(payload.password),
      name: payload.name,
    };
    await UserModel.create(updatedPayload);
  } catch (error) {
    throw error;
  }
};

export const loginUser = async payload => {
  try {
    const userDetails = await UserModel.findByEmail(payload.email);
    if (!userDetails) {
      throw errors.USER_NOT_FOUND();
    }
    const tokenPayload = {
      email: userDetails?.email,
      role: userDetails?.role,
      loggedInTime: new Date(),
    };
    const isUserValid = await isPasswordValid(payload.password, userDetails?.password);
    if (isUserValid) {
      return generateToken(tokenPayload);
    } else {
      throw errors.INVALID_USER();
    }
  } catch (error) {
    throw error;
  }
};

export const getUserDetail = async email => {
  try {
    const userDetails = await UserModel.findByEmail(email);
    return userDetails;
  } catch (error) {
    throw error;
  }
};
