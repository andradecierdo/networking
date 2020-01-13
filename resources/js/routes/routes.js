import homeRoutes from "../modules/home/routes"
import authRoutes from "../modules/auth/routes"
import userRoutes from "../modules/user/routes"
import experienceRoutes from "../modules/experience/routes"

export default [
  ...homeRoutes,
  ...authRoutes,
  ...userRoutes,
  ...experienceRoutes,
]
