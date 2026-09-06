# Coherent APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/:status/:requestId

## userRouter
- GET /user/request/received
- GET /user/connections
- GET /user/feed - GETS you the profiles of other users on platform
- GET /user/:id

STATUS: interested, ignore, accepted, rejected

## pagination

/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

FORMULA OF SKIP: skip = (page-1) * limit

## chatRouter
- GET /chat/:toUserId — Fetches previous chat messages between the logged-in user and selected user from MongoDB

### Chat
    Chat messages are stored in MongoDB
    REST API fetches previous messages
    Socket.IO handles real-time messaging
    Users can send and receive messages without refreshing

## WebSocket / Socket.IO
    Establishes real-time connection between client and server
    Real-time message sending
    Real-time message receiving
    Used for live chat between connected users