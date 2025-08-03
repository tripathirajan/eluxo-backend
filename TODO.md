# ✅ Eluxo Backend – TODO

## 🔐 Security

- [ ] Integrate `helmet` for secure HTTP headers  
       _Example: `app.use(require('helmet')());`_

- [ ] Setup `express-rate-limit` for rate limiting  
       _Example: `app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));`_

- [ ] Use `express-mongo-sanitize` to prevent NoSQL injection  
       _Example: `app.use(require('express-mongo-sanitize')());`_

- [ ] Add `xss-clean` for XSS protection  
       _Example: `app.use(require('xss-clean')());`_

- [ ] Whitelist CORS origins securely
- [ ] Implement JWT expiration + refresh token logic
- [ ] Centralized 404 and error handler  
       _Example: Add `notFound` and `errorHandler` middleware after all routes_  
       _404: `res.status(404).json({ message: 'Route not found' })`_  
       _Error handler: Catch thrown errors and respond with status + message_

---

## 🛠️ Utilities

- [ ] Create `AppError` custom error class  
       _Example: `throw new AppError('Unauthorized', 401);`_

- [ ] Build async error wrapper for route handlers  
       _Example: `const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);`_

- [ ] Implement API response formatter (`res.success`, `res.error`)  
       _Example: `res.success(data)` or `res.error(err)`_

- [ ] Setup `winston` or `pino` logger
- [ ] Add `env` validation using `joi`

---

## ⚙️ Core Architecture

- [ ] Modular route structure (`routes/user.route.js`, etc.)
- [ ] Service-layer abstraction (separate from controller)
- [ ] Plugin system: middleware, Mongo, error, crash handler
- [ ] Graceful shutdown on SIGINT/SIGTERM
- [ ] Use `AsyncLocalStorage` for request context tracking

---

## 🔑 Auth & Sessions

- [ ] Implement JWT-based authentication  
       _Example: `jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });`_

- [ ] Add refresh token flow  
       _Example: Store refresh token in HTTP-only cookie and regenerate access token_

- [ ] Build password reset & email verification system

---

## ✉️ Email & Notifications

- [ ] Create a mailer service using `nodemailer`
- [ ] Email templates for welcome, reset, verification
- [ ] Basic notification system with DB persistence

---

## 📊 Monitoring & Documentation

- [ ] Integrate Prometheus or basic `/health` endpoint
- [ ] Setup OpenAPI (Swagger) docs  
       _Example: Use `swagger-jsdoc` + `swagger-ui-express` to generate API docs from comments_

- [ ] Setup `.editorconfig` and enforce formatting
- [ ] Add GitHub Actions for lint/test check on PR

---

## 🔁 Optional Enhancements

- [ ] Add `contributing.md` and `code-of-conduct.md`
- [ ] Setup Docker for local dev & Mongo
- [ ] Add CLI to scaffold routes/services/models
