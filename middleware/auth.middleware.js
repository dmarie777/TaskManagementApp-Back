import jwt from "jsonwebtoken";
import User from '../models/user.model.js'



const auth = async (request, response, next) => {
    try {
      let token;
        if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
            token = request.headers.authorization.split( ' ' )[1];
        }
  
      if(!token) return response.status(401).json({ message: 'Unauthorized1' });

      const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
  
      const user = await User.findById(decodedToken.userId);
  
      
      if(!user) return response.status(401).json({ message: 'Unauthorized2' })
      request.user = user;
  
      next();
      
    } catch (error) {
      response.status(401).json({
        error: new Error("Unauthorized"),
      });      
    }
  };
  
  export default auth