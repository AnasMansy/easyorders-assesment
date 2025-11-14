import { useCartStore } from "../../stores/cartStore";

export function CartIcon() {
  const count = useCartStore((s) => s.count());
  const open = useCartStore((s) => s.open);

  return (
    <button onClick={open} className="relative">
      <span className="material-icons text-3xl">shopping_cart</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs px-2 py-0.5">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQty, subtotal } = useCartStore();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}>
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />
      {/* panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-xl transition-transform
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button onClick={close} className="text-sm underline">Close</button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-140px)]">
          {items.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3 border rounded-xl p-3">
                <img src={it.image} alt={it.name} className="h-16 w-16 rounded-lg object-cover border" />
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  {it.variantLabel && <div className="text-xs text-gray-500">{it.variantLabel}</div>}
                  <div className="mt-1 flex items-center gap-2">
                    <button
                      onClick={() => updateQty(it.id, Math.max(1, it.quantity - 1))}
                      className="px-2 py-1 border rounded"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{it.quantity}</span>
                    <button
                      onClick={() => updateQty(it.id, it.quantity + 1)}
                      className="px-2 py-1 border rounded"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    EGP{" "}
                    {(it.salePrice && it.salePrice > 0 ? it.salePrice : it.price) *
                      it.quantity}
                  </div>
                  <button onClick={() => removeItem(it.id)} className="text-xs text-red-600 underline mt-2">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Subtotal</div>
            <div className="text-lg font-bold">EGP {subtotal()}</div>
          </div>
          <button className="mt-3 w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-900">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
