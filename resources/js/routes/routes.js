import homeRoutes from "../modules/home/routes"
import authRoutes from "../modules/auth/routes"
import userRoutes from "../modules/user/routes"
import experienceRoutes from "../modules/experience/routes"
import adminLoginRoutes from "../modules/admin/login/routes"
import adminDashboardRoutes from "../modules/admin/dashboard/routes"
import adminCompanyRoutes from "../modules/admin/transactions/routes"

export default [
  ...homeRoutes,
  ...authRoutes,
  ...userRoutes,
  ...experienceRoutes,
  ...adminLoginRoutes,
  ...adminDashboardRoutes,
  ...adminCompanyRoutes,
]
