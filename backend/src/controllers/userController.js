import * as userService from "../services/userServices.js"

export function registerUser(req, res, next) {
  userService
    .registerUser(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

export function addUser(req, res, next) {
  userService.saveUser(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      next(err)
    });
}

export function checkoutUser(req, res, next) {
  const { name, email, phone, address } = req.body;
  userService
    .saveCheckout(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}


/**
 * Controller to get details of all Users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function getAllUsers(req, res, next) {
  const pageNumber = req.query.page || 1;
  const itemsPerPage = req.query.limit || 10;
  userService
    .getAllUsers(pageNumber, itemsPerPage)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

export function getUserDetails(req, res, next) {
  const user = req.params.id;
  userService
    .getUserDetails(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

export function updateUser(req, res, next) {
  userService.updateUserById(req.params.userIdentifier, req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err))
}

export function deleteUser(req, res, next) {
  console.log(req.params.userIdentifier, "delte id")
  userService.deleteUserById(req.params.userIdentifier)
    .then((data) => res.json(data))
    .catch((err) => next(err))
}

/**
 * Controller for User login.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function login(req, res, next) {
  userService
    .login(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}





