import { Prisma } from "@prisma/client";
import { ICreateProductDto, IUpdateProductDto } from "@repo/shared";

export const buildUpdateProduct = (
  dto: IUpdateProductDto,
): Prisma.ProductUpdateInput => {
  const base: Prisma.ProductUpdateInput = {
    ...(dto.title !== undefined && { title: dto.title }),
    ...(dto.description !== undefined && { description: dto.description }),
    ...(dto.price !== undefined && { price: dto.price }),
    ...(dto.stock !== undefined && { stock: dto.stock }),
    ...(dto.lowStockThreshold !== undefined && {
      lowStockThreshold: dto.lowStockThreshold,
    }),
  };

  switch (dto.type) {
    case "KEYBOARD":
      return {
        ...base,
        keyboard: {
          update: {
            ...(dto.layout !== undefined && { layout: dto.layout }),
            ...(dto.caseMaterial !== undefined && {
              caseMaterial: dto.caseMaterial,
            }),
            ...(dto.isHotswap !== undefined && {
              isHotswap: dto.isHotswap,
            }),
          },
        },
      };

    case "SWITCHES":
      return {
        ...base,
        switches: {
          update: {
            ...(dto.switchType !== undefined && {
              switchType: dto.switchType,
            }),
            ...(dto.actuationForce !== undefined && {
              actuationForce: dto.actuationForce,
            }),
            ...(dto.brand !== undefined && {
              brand: dto.brand,
            }),
          },
        },
      };

    case "KEYCAPS":
      return {
        ...base,
        keycaps: {
          update: {
            ...(dto.profile !== undefined && {
              profile: dto.profile,
            }),
            ...(dto.material !== undefined && {
              material: dto.material,
            }),
          },
        },
      };

    default:
      throw new Error("Invalid product type");
  }
};

export const buildCreateProduct = (
  dto: ICreateProductDto,
  sellerId: number,
): Prisma.ProductCreateInput => {
  const base: Prisma.ProductCreateInput = {
    title: dto.title,
    description: dto.description,
    price: dto.price,
    stock: dto.stock,
    type: dto.type,
    lowStockThreshold: dto.lowStockThreshold,
    images: {
      create: dto.images?.map((img) => ({
        url: img.url,
        key: img.key,
      })),
    },
    seller: {
      connect: { id: sellerId },
    },
  };

  switch (dto.type) {
    case "KEYBOARD":
      return {
        ...base,
        keyboard: {
          create: {
            layout: dto.layout,
            caseMaterial: dto.caseMaterial,
            isHotswap: dto.isHotswap,
          },
        },
      };

    case "SWITCHES":
      return {
        ...base,
        switches: {
          create: {
            switchType: dto.switchType,
            actuationForce: dto.actuationForce,
            brand: dto.brand,
          },
        },
      };

    case "KEYCAPS":
      return {
        ...base,
        keycaps: {
          create: {
            profile: dto.profile,
            material: dto.material,
          },
        },
      };

    default:
      throw new Error("Invalid product type");
  }
};
