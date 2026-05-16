export { Regex } from "./constants/regex";
export { UserRoleEnum } from "./constants/user.roles";
export { COUNTRIES } from "./constants/countries";

export { FileTypeEnum } from "./enums/enums";

export type { Category, CategoryResponse } from "./types/category.types";
export type {
  FileOptionsType,
  IAscDescType,
  IFavoritedResponse,
  IMessageResponse,
  IPaginatedResponse,
  IPagination,
} from "./types/general.types";

export {
  type IOrderItem,
  type IOrderItemStatus,
  ORDER_ITEM_STATUSES,
} from "./types/order-item.types";
export {
  type IMyOrdersResponse,
  type IOrder,
  type IOrderStatus,
  ORDER_STATUSES,
} from "./types/order.types";
export type {
  IBaseProduct,
  IKeyboard,
  IKeycaps,
  IMyProduct,
  IMyProductsResponse,
  IProductCard,
  IProductDetails,
  IProductType,
  IProductsResponse,
  ISwitches,
} from "./types/product.types";
export { PRODUCT_TYPES } from "./types/product.types";

export type { IReview, IReviewResponse } from "./types/review.types";
export type { User, UserResponse } from "./types/user.types";

export type {
  ForgotPasswordDto,
  ResendVerificationDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  VerifyAccountDto,
} from "./zod/auth.schema";
export { authFields, authSchemas } from "./zod/auth.schema";

export { type CategoryDto, categorySchema } from "./zod/category.schema";

export {
  type OrderItemStatusDto,
  orderItemStatusSchema,
} from "./zod/order-item.schema";

export {
  type CheckoutDto,
  type CustomerInfoDto,
  type OrderItemDto,
  checkoutSchema,
  customerInfoSchema,
  orderItemSchema,
} from "./zod/order.schema";
export {
  type CreateProductDto,
  type UpdateProductDto,
  baseProductSchema,
  productSchema,
  updateProductSchema,
} from "./zod/product.schema";
export { type CreateReviewDto, reviewSchema } from "./zod/review.schema";
export {
  type UserUpdateDto,
  updateProfileSchema,
  userFields,
} from "./zod/user.schema";

export { FileConfig } from "./configs/file.config";
