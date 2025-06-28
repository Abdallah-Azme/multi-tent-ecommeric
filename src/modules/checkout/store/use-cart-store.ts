import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TenantCart {
  productId: string[];
}

interface CartState {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantId: string) => void;
  clearAllCarts: () => void;
  getCartByTenant: (tenantSlug: string) => string[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantCarts: {},
      addProduct: (tenantSlug, productId) => {
        set((state) => {
          const tenantCart = state.tenantCarts[tenantSlug] || { productId: [] };
          if (!tenantCart.productId.includes(productId)) {
            tenantCart.productId.push(productId);
          }
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: tenantCart,
            },
          };
        });
        console.log(get().tenantCarts);
      },
      removeProduct: (tenantSlug, productId) => {
        set((state) => {
          const tenantCart = state.tenantCarts[tenantSlug] || { productId: [] };
          tenantCart.productId = tenantCart.productId.filter(
            (id) => id !== productId
          );
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: tenantCart,
            },
          };
        });
        console.log(get().tenantCarts);
      },
      clearCart: (tenantSlug) => {
        set((state) => {
          const tenantCart = state.tenantCarts[tenantSlug] || { productId: [] };
          tenantCart.productId = [];
          return {
            tenantCarts: {
              ...state.tenantCarts,
              [tenantSlug]: tenantCart,
            },
          };
        });
      },
      clearAllCarts: () => {
        set(() => {
          return {
            tenantCarts: {},
          };
        });
      },
      getCartByTenant: (tenantSlug) => {
        return get().tenantCarts[tenantSlug]?.productId || [];
      },
    }),
    // config persist
    {
      name: "funroad-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
