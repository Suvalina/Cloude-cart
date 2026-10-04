import { useEffect, useMemo, useState } from "react"

// ============================================================
// DEFAULT PRODUCTS
// ============================================================

const defaultProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    rating: 4.5,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description:
      "Premium wireless headphones with comfortable ear cushions and clear sound.",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 3499,
    rating: 4.3,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    description:
      "Modern smartwatch with fitness tracking, notifications and stylish design.",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    price: 1999,
    rating: 4.6,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Lightweight running shoes designed for everyday comfort and performance.",
  },
  {
    id: 4,
    name: "Urban Backpack",
    category: "Fashion",
    price: 1299,
    rating: 4.2,
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    description:
      "Spacious and durable backpack suitable for college, office and travel.",
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "Home",
    price: 2899,
    rating: 4.4,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    description:
      "Easy-to-use coffee maker for delicious coffee at home every morning.",
  },
  {
    id: 6,
    name: "Minimal Desk Lamp",
    category: "Home",
    price: 899,
    rating: 4.1,
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    description:
      "Minimal modern desk lamp perfect for study tables and office desks.",
  },
]

// ============================================================
// STORAGE HELPERS
// ============================================================

const safeArray = (key, fallback = []) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null")
    return Array.isArray(value) ? value : fallback
  } catch {
    return fallback
  }
}

const safeObject = (key, fallback = {}) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null")

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      return value
    }

    return fallback
  } catch {
    return fallback
  }
}

const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

// ============================================================
// STAR COMPONENT
// ============================================================

const Stars = ({ rating = 0, size = "normal" }) => {
  const numericRating = Number(rating) || 0

  return (
    <div
      className={`stars-container ${
        size === "large" ? "stars-large" : ""
      }`}
      aria-label={`${numericRating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(numericRating)

        return (
          <span
            key={star}
            className={`star ${
              filled ? "star-filled" : "star-empty"
            }`}
          >
            ★
          </span>
        )
      })}
    </div>
  )
}

// ============================================================
// APP
// ============================================================

export default function App() {
  // ============================================================
  // STATES
  // ============================================================

  const [products, setProducts] = useState(() =>
    safeArray("cloudCartProducts", defaultProducts)
  )

  const [user, setUser] = useState(() =>
    safeObject("cloudCartUser", null)
  )

  const [users, setUsers] = useState(() =>
    safeArray("cloudCartUsers", [])
  )

  const [cart, setCart] = useState(() =>
    safeArray("cloudCartCart", [])
  )

  const [wishlist, setWishlist] = useState(() =>
    safeArray("cloudCartWishlist", [])
  )

  const [reviews, setReviews] = useState(() =>
    safeArray("cloudCartReviews", [])
  )

  const [orders, setOrders] = useState(() =>
    safeArray("cloudCartOrders", [])
  )

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("default")

  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const [showCart, setShowCart] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showOrders, setShowOrders] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const [showCheckout, setShowCheckout] = useState(false)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const [couponMessage, setCouponMessage] = useState("")

  const [reviewRating, setReviewRating] = useState(5)
  const [reviewText, setReviewText] = useState("")

  const [checkoutName, setCheckoutName] = useState("")
  const [checkoutPhone, setCheckoutPhone] = useState("")
  const [checkoutAddress, setCheckoutAddress] = useState("")
  const [checkoutCity, setCheckoutCity] = useState("")
  const [checkoutPin, setCheckoutPin] = useState("")

  // ============================================================
  // LOCAL STORAGE
  // ============================================================

  useEffect(() => {
    saveData("cloudCartProducts", products)
  }, [products])

  useEffect(() => {
    if (user) {
      saveData("cloudCartUser", user)
    } else {
      localStorage.removeItem("cloudCartUser")
    }
  }, [user])

  useEffect(() => {
    saveData("cloudCartUsers", users)
  }, [users])

  useEffect(() => {
    saveData("cloudCartCart", cart)
  }, [cart])

  useEffect(() => {
    saveData("cloudCartWishlist", wishlist)
  }, [wishlist])

  useEffect(() => {
    saveData("cloudCartReviews", reviews)
  }, [reviews])

  useEffect(() => {
    saveData("cloudCartOrders", orders)
  }, [orders])

  // ============================================================
  // CATEGORIES
  // ============================================================

  const categories = useMemo(() => {
    const values = products.map((product) => product.category)

    return ["All", ...new Set(values)]
  }, [products])

  // ============================================================
  // FILTER + SORT
  // ============================================================

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (search.trim()) {
      const searchText = search.toLowerCase()

      result = result.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText) ||
          product.description.toLowerCase().includes(searchText)
        )
      })
    }

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      )
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price)
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price)
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [products, search, category, sort])

  // ============================================================
  // REVIEW HELPERS
  // ============================================================

  const getProductReviews = (productId) => {
    if (!Array.isArray(reviews)) {
      return []
    }

    return reviews.filter(
      (review) =>
        Number(review.productId) === Number(productId)
    )
  }

  const getAverageRating = (product) => {
    const productReviews = getProductReviews(product.id)

    if (productReviews.length === 0) {
      return Number(product.rating) || 0
    }

    const total = productReviews.reduce(
      (sum, review) => sum + (Number(review.rating) || 0),
      0
    )

    return total / productReviews.length
  }

  // ============================================================
  // CART
  // ============================================================

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      )

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                ),
              }
            : item
        )
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ]
    })

    alert(`${product.name} added to cart`)
  }

  const increaseQuantity = (productId) => {
    setCart((previousCart) =>
      previousCart.map((item) => {
        if (item.id !== productId) {
          return item
        }

        return {
          ...item,
          quantity: Math.min(
            item.quantity + 1,
            item.stock
          ),
        }
      })
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((previousCart) =>
      previousCart
        .map((item) => {
          if (item.id !== productId) {
            return item
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          }
        })
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    )
  }

  // ============================================================
  // WISHLIST
  // ============================================================

  const toggleWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const exists = previousWishlist.some(
        (item) => item.id === product.id
      )

      if (exists) {
        return previousWishlist.filter(
          (item) => item.id !== product.id
        )
      }

      return [...previousWishlist, product]
    })
  }

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId)
  }

  // ============================================================
  // CART TOTAL
  // ============================================================

  const cartSubtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.price) * Number(item.quantity),
      0
    )
  }, [cart])

  const deliveryCharge =
    cartSubtotal > 0 && cartSubtotal < 999 ? 99 : 0

  const discountAmount = Math.round(
    (cartSubtotal * discount) / 100
  )

  const cartTotal =
    cartSubtotal + deliveryCharge - discountAmount

  // ============================================================
  // COUPON
  // ============================================================

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase()

    if (code === "CLOUD10") {
      setDiscount(10)
      setCouponMessage("10% discount applied successfully!")
      return
    }

    if (code === "CLOUD100") {
      if (cartSubtotal >= 2000) {
        setDiscount(100)
        setCouponMessage(
          "100% discount applied successfully!"
        )
      } else {
        setDiscount(0)
        setCouponMessage(
          "CLOUD100 requires minimum cart value ₹2000."
        )
      }

      return
    }

    setDiscount(0)
    setCouponMessage("Invalid coupon code.")
  }

  // ============================================================
  // LOGIN
  // ============================================================

  const handleLogin = (event) => {
    event.preventDefault()

    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() ===
          loginEmail.trim().toLowerCase() &&
        item.password === loginPassword
    )

    if (!foundUser) {
      alert("Invalid email or password.")
      return
    }

    setUser(foundUser)
    setLoginEmail("")
    setLoginPassword("")
    setShowLogin(false)

    alert("Login successful!")
  }

  // ============================================================
  // SIGNUP
  // ============================================================

  const handleSignup = (event) => {
    event.preventDefault()

    const name = signupName.trim()
    const email = signupEmail.trim().toLowerCase()
    const password = signupPassword

    if (!name || !email || !password) {
      alert("Please fill all fields.")
      return
    }

    const alreadyExists = users.some(
      (item) => item.email.toLowerCase() === email
    )

    if (alreadyExists) {
      alert("Email already registered.")
      return
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    }

    setUsers((previousUsers) => [
      ...previousUsers,
      newUser,
    ])

    setUser(newUser)

    setSignupName("")
    setSignupEmail("")
    setSignupPassword("")

    setShowSignup(false)

    alert("Account created successfully!")
  }

  // ============================================================
  // LOGOUT
  // ============================================================

  const logout = () => {
    setUser(null)
    alert("Logged out successfully.")
  }

  // ============================================================
  // REVIEW SUBMIT
  // ============================================================

  const submitReview = (event) => {
    event.preventDefault()

    if (!selectedProduct) {
      return
    }

    if (!user) {
      alert("Please login first to write a review.")
      setShowLogin(true)
      return
    }

    if (!reviewText.trim()) {
      alert("Please write your review.")
      return
    }

    const newReview = {
      id: Date.now(),
      productId: selectedProduct.id,
      userId: user.id,
      userName: user.name,
      rating: Number(reviewRating),
      text: reviewText.trim(),
      date: new Date().toLocaleDateString("en-IN"),
    }

    setReviews((previousReviews) => {
      const safeReviews = Array.isArray(previousReviews)
        ? previousReviews
        : []

      return [...safeReviews, newReview]
    })

    setReviewRating(5)
    setReviewText("")

    alert("Review submitted successfully!")
  }

  // ============================================================
  // CHECKOUT
  // ============================================================

  const openCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.")
      return
    }

    if (!user) {
      alert("Please login before checkout.")
      setShowLogin(true)
      return
    }

    setShowCart(false)
    setShowCheckout(true)
  }

  const placeOrder = (event) => {
    event.preventDefault()

    if (!checkoutName.trim()) {
      alert("Please enter your name.")
      return
    }

    if (!checkoutPhone.trim()) {
      alert("Please enter your phone number.")
      return
    }

    if (!checkoutAddress.trim()) {
      alert("Please enter your address.")
      return
    }

    if (!checkoutCity.trim()) {
      alert("Please enter your city.")
      return
    }

    if (!checkoutPin.trim()) {
      alert("Please enter your PIN code.")
      return
    }

    const newOrder = {
      id: `CC-${Date.now()}`,
      userId: user.id,
      items: cart,
      subtotal: cartSubtotal,
      delivery: deliveryCharge,
      discount: discountAmount,
      total: cartTotal,
      status: "Placed",
      date: new Date().toLocaleString("en-IN"),
      shipping: {
        name: checkoutName.trim(),
        phone: checkoutPhone.trim(),
        address: checkoutAddress.trim(),
        city: checkoutCity.trim(),
        pin: checkoutPin.trim(),
      },
    }

    setOrders((previousOrders) => [
      newOrder,
      ...previousOrders,
    ])

    setCart([])
    setCoupon("")
    setDiscount(0)
    setCouponMessage("")

    setCheckoutName("")
    setCheckoutPhone("")
    setCheckoutAddress("")
    setCheckoutCity("")
    setCheckoutPin("")

    setShowCheckout(false)
    setShowOrders(true)

    alert("Order placed successfully!")
  }

  // ============================================================
  // BUY NOW
  // ============================================================

  const buyNow = (product) => {
    if (!user) {
      alert("Please login before buying.")
      setShowLogin(true)
      return
    }

    setCart([
      {
        ...product,
        quantity: 1,
      },
    ])

    setShowCheckout(true)
    setSelectedProduct(null)
  }

  // ============================================================
  // OPEN PRODUCT
  // ============================================================

  const openProduct = (product) => {
    setSelectedProduct(product)
    setReviewRating(5)
    setReviewText("")
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }}
            className="shrink-0 text-2xl font-black tracking-tight text-indigo-600"
          >
            Cloud Cart
          </button>

          <div className="hidden flex-1 md:block">
            <div className="relative mx-auto max-w-xl">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search products..."
                className="input-style pr-12"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl">
                🔍
              </span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowWishlist(true)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-lg hover:bg-slate-100"
              title="Wishlist"
            >
              ❤️
              {wishlist.length > 0 && (
                <span className="ml-1 text-sm font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowCart(true)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-lg hover:bg-slate-100"
              title="Cart"
            >
              🛒
              {cart.length > 0 && (
                <span className="ml-1 text-sm font-bold">
                  {cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowOrders(true)}
                  className="hidden rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-100 sm:block"
                >
                  Orders
                </button>

                <button
                  onClick={logout}
                  className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700"
              >
                Login
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-slate-100 px-4 py-3 md:hidden">
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            className="input-style"
          />
        </div>
      </header>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="mb-4 w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              ✨ Smart Shopping Experience
            </span>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Shop smarter with
              <span className="block text-yellow-300">
                Cloud Cart
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-indigo-100 sm:text-lg">
              Discover quality products, compare prices,
              save your favourites and enjoy a simple
              online shopping experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  document
                    .getElementById("products")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }}
                className="rounded-xl bg-white px-6 py-3 font-bold text-indigo-700 shadow-lg hover:bg-indigo-50"
              >
                Shop Now →
              </button>

              <button
                onClick={() => setShowWishlist(true)}
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur hover:bg-white/20"
              >
                View Wishlist
              </button>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-white/10 blur-3xl" />

              <div className="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white p-6 text-center text-slate-800">
                    <div className="text-4xl">🛍️</div>
                    <div className="mt-2 font-bold">
                      Quality Products
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-6 text-center text-slate-800">
                    <div className="text-4xl">🚚</div>
                    <div className="mt-2 font-bold">
                      Fast Delivery
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-6 text-center text-slate-800">
                    <div className="text-4xl">🔒</div>
                    <div className="mt-2 font-bold">
                      Secure Shopping
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-6 text-center text-slate-800">
                    <div className="text-4xl">⭐</div>
                    <div className="mt-2 font-bold">
                      Customer Reviews
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURES
      ======================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="flex items-center gap-3 rounded-xl p-3">
            <span className="text-3xl">🚚</span>
            <div>
              <div className="font-bold">Fast Delivery</div>
              <div className="text-sm text-slate-500">
                Quick & reliable
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl p-3">
            <span className="text-3xl">🔒</span>
            <div>
              <div className="font-bold">Secure Payment</div>
              <div className="text-sm text-slate-500">
                Safe checkout
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl p-3">
            <span className="text-3xl">↩️</span>
            <div>
              <div className="font-bold">Easy Returns</div>
              <div className="text-sm text-slate-500">
                Hassle-free returns
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl p-3">
            <span className="text-3xl">💬</span>
            <div>
              <div className="font-bold">24/7 Support</div>
              <div className="text-sm text-slate-500">
                We're here to help
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PRODUCTS
      ======================================================== */}

      <main
        id="products"
        className="mx-auto max-w-7xl px-4 py-12 lg:px-8"
      >
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-semibold text-indigo-600">
              OUR COLLECTION
            </p>

            <h2 className="mt-1 text-3xl font-black sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-2 text-slate-500">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="input-style min-w-[180px]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All"
                    ? "All Categories"
                    : item}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              className="input-style min-w-[180px]"
            >
              <option value="default">
                Sort: Default
              </option>
              <option value="low">
                Price: Low to High
              </option>
              <option value="high">
                Price: High to Low
              </option>
              <option value="rating">
                Highest Rated
              </option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-5xl">🔎</div>
            <h3 className="mt-4 text-xl font-bold">
              No products found
            </h3>
            <p className="mt-2 text-slate-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("")
                setCategory("All")
                setSort("default")
              }}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const averageRating =
                getAverageRating(product)

              const productReviewCount =
                getProductReviews(product.id).length

              return (
                <article
                  key={product.id}
                  className="product-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image h-64 w-full object-cover"
                    />

                    <button
                      onClick={() =>
                        toggleWishlist(product)
                      }
                      className="absolute right-4 top-4 rounded-full bg-white/95 p-3 text-xl shadow-lg"
                      title="Wishlist"
                    >
                      {isWishlisted(product.id)
                        ? "❤️"
                        : "🤍"}
                    </button>

                    <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold">
                          {product.name}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <Stars rating={averageRating} />

                      <span className="text-sm font-semibold text-slate-600">
                        {averageRating.toFixed(1)}
                      </span>

                      <span className="text-sm text-slate-400">
                        ({productReviewCount})
                      </span>
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-black text-slate-900">
                          ₹
                          {product.price.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {product.stock} in stock
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          openProduct(product)
                        }
                        className="rounded-xl bg-indigo-600 px-4 py-2.5 font-bold text-white hover:bg-indigo-700"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <footer className="mt-10 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-2xl font-black text-indigo-400">
                Cloud Cart
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                Your simple and smart online shopping
                destination.
              </p>
            </div>

            <div>
              <h4 className="font-bold">Quick Links</h4>

              <div className="mt-4 space-y-2 text-sm text-slate-400">
                <button
                  onClick={() =>
                    document
                      .getElementById("products")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="block hover:text-white"
                >
                  Products
                </button>

                <button
                  onClick={() => setShowWishlist(true)}
                  className="block hover:text-white"
                >
                  Wishlist
                </button>

                <button
                  onClick={() => setShowCart(true)}
                  className="block hover:text-white"
                >
                  Cart
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold">
                Customer Support
              </h4>

              <p className="mt-4 text-sm text-slate-400">
                Email: support@cloudcart.com
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Phone: +91 98765 43210
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
            © 2026 Cloud Cart. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ========================================================
          LOGIN MODAL
      ======================================================== */}

      {showLogin && (
        <div className="modal-bg">
          <div className="modal-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Welcome Back
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Login to your Cloud Cart account
                </p>
              </div>

              <button
                onClick={() => setShowLogin(false)}
                className="rounded-lg px-3 py-2 text-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleLogin}
              className="mt-6 space-y-4"
            >
              <input
                type="email"
                value={loginEmail}
                onChange={(event) =>
                  setLoginEmail(event.target.value)
                }
                placeholder="Email"
                className="input-style"
              />

              <input
                type="password"
                value={loginPassword}
                onChange={(event) =>
                  setLoginPassword(event.target.value)
                }
                placeholder="Password"
                className="input-style"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700"
              >
                Login
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-slate-500">
              Don't have an account?

              <button
                onClick={() => {
                  setShowLogin(false)
                  setShowSignup(true)
                }}
                className="ml-1 font-bold text-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SIGNUP MODAL
      ======================================================== */}

      {showSignup && (
        <div className="modal-bg">
          <div className="modal-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Create Account
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Join Cloud Cart today
                </p>
              </div>

              <button
                onClick={() => setShowSignup(false)}
                className="rounded-lg px-3 py-2 text-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSignup}
              className="mt-6 space-y-4"
            >
              <input
                type="text"
                value={signupName}
                onChange={(event) =>
                  setSignupName(event.target.value)
                }
                placeholder="Full Name"
                className="input-style"
              />

              <input
                type="email"
                value={signupEmail}
                onChange={(event) =>
                  setSignupEmail(event.target.value)
                }
                placeholder="Email"
                className="input-style"
              />

              <input
                type="password"
                value={signupPassword}
                onChange={(event) =>
                  setSignupPassword(event.target.value)
                }
                placeholder="Password"
                className="input-style"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700"
              >
                Create Account
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-slate-500">
              Already have an account?

              <button
                onClick={() => {
                  setShowSignup(false)
                  setShowLogin(true)
                }}
                className="ml-1 font-bold text-indigo-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PRODUCT DETAILS MODAL
      ======================================================== */}

      {selectedProduct && (
        <div className="modal-bg">
          <div className="modal-card max-w-5xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">
                Product Details
              </h2>

              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg px-3 py-2 text-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-80 w-full rounded-2xl object-cover"
                />

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() =>
                      addToCart(selectedProduct)
                    }
                    className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      buyNow(selectedProduct)
                    }
                    className="flex-1 rounded-xl bg-slate-900 px-4 py-3 font-bold text-white hover:bg-slate-800"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                  {selectedProduct.category}
                </span>

                <h3 className="mt-4 text-3xl font-black">
                  {selectedProduct.name}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <Stars
                    rating={getAverageRating(
                      selectedProduct
                    )}
                    size="large"
                  />

                  <span className="font-bold">
                    {getAverageRating(
                      selectedProduct
                    ).toFixed(1)}
                  </span>
                </div>

                <p className="mt-5 text-3xl font-black">
                  ₹
                  {selectedProduct.price.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  {selectedProduct.description}
                </p>

                <p className="mt-4 font-semibold text-green-600">
                  {selectedProduct.stock} items available
                </p>

                {/* REVIEWS */}
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h4 className="text-xl font-black">
                    Customer Reviews
                  </h4>

                  {getProductReviews(
                    selectedProduct.id
                  ).length === 0 ? (
                    <p className="mt-3 text-sm text-slate-500">
                      No reviews yet. Be the first to
                      review this product.
                    </p>
                  ) : (
                    <div className="mt-4 max-h-60 space-y-4 overflow-y-auto">
                      {getProductReviews(
                        selectedProduct.id
                      ).map((review) => (
                        <div
                          key={review.id}
                          className="rounded-xl bg-slate-50 p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="font-bold">
                                {review.userName}
                              </p>

                              <div className="mt-1">
                                <Stars
                                  rating={review.rating}
                                />
                              </div>
                            </div>

                            <span className="text-xs text-slate-400">
                              {review.date}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {review.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* REVIEW FORM */}
                  <form
                    onSubmit={submitReview}
                    className="mt-6 rounded-2xl border border-slate-200 p-4"
                  >
                    <h5 className="font-bold">
                      Write a Review
                    </h5>

                    {!user ? (
                      <p className="mt-3 text-sm text-slate-500">
                        Please login to write a review.
                      </p>
                    ) : (
                      <>
                        <div className="mt-4">
                          <p className="mb-2 text-sm font-semibold">
                            Your Rating
                          </p>

                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    setReviewRating(star)
                                  }
                                  className="border-0 bg-transparent p-0 text-3xl leading-none"
                                  style={{
                                    color:
                                      star <= reviewRating
                                        ? "#f59e0b"
                                        : "#d1d5db",
                                  }}
                                >
                                  ★
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        <textarea
                          value={reviewText}
                          onChange={(event) =>
                            setReviewText(
                              event.target.value
                            )
                          }
                          placeholder="Write your review..."
                          className="input-style mt-4"
                        />

                        <button
                          type="submit"
                          className="mt-3 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700"
                        >
                          Submit Review
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CART DRAWER
      ======================================================== */}

      {showCart && (
        <div
          className="drawer-bg"
          onClick={() => setShowCart(false)}
        >
          <div
            className="drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-2xl font-black">
                  Your Cart
                </h2>

                <p className="text-sm text-slate-500">
                  {cart.length} product types
                </p>
              </div>

              <button
                onClick={() => setShowCart(false)}
                className="rounded-lg px-3 py-2 text-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="text-6xl">🛒</div>
                  <h3 className="mt-4 text-xl font-bold">
                    Your cart is empty
                  </h3>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold">
                            {item.name}
                          </h4>

                          <p className="mt-1 font-bold">
                            ₹
                            {item.price.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center rounded-lg border border-slate-200">
                              <button
                                onClick={() =>
                                  decreaseQuantity(
                                    item.id
                                  )
                                }
                                className="px-3 py-1.5"
                              >
                                −
                              </button>

                              <span className="px-3 font-bold">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  increaseQuantity(
                                    item.id
                                  )
                                }
                                className="px-3 py-1.5"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() =>
                                removeFromCart(item.id)
                              }
                              className="text-sm font-semibold text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-200 p-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(event) =>
                      setCoupon(event.target.value)
                    }
                    placeholder="Coupon code"
                    className="input-style"
                  />

                  <button
                    onClick={applyCoupon}
                    className="rounded-xl bg-slate-900 px-4 font-bold text-white"
                  >
                    Apply
                  </button>
                </div>

                {couponMessage && (
                  <p className="mt-2 text-sm text-indigo-600">
                    {couponMessage}
                  </p>
                )}

                <div className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ₹{cartSubtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-semibold">
                      ₹
                      {deliveryCharge.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -₹
                      {discountAmount.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-black">
                    <span>Total</span>
                    <span>
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={openCheckout}
                  className="mt-5 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          WISHLIST DRAWER
      ======================================================== */}

      {showWishlist && (
        <div
          className="drawer-bg"
          onClick={() => setShowWishlist(false)}
        >
          <div
            className="drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-2xl font-black">
                  Wishlist
                </h2>

                <p className="text-sm text-slate-500">
                  {wishlist.length} saved products
                </p>
              </div>

              <button
                onClick={() => setShowWishlist(false)}
                className="rounded-lg px-3 py-2 text-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {wishlist.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="text-6xl">❤️</div>

                  <h3 className="mt-4 text-xl font-bold">
                    Wishlist is empty
                  </h3>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold">
                            {item.name}
                          </h4>

                          <p className="mt-1 font-bold">
                            ₹
                            {item.price.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() =>
                                addToCart(item)
                              }
                              className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white"
                            >
                              Add to Cart
                            </button>

                            <button
                              onClick={() =>
                                toggleWishlist(item)
                              }
                              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CHECKOUT MODAL
      ======================================================== */}

      {showCheckout && (
        <div className="modal-bg">
          <div className="modal-card max-w-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  Checkout
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter your delivery details
                </p>
              </div>

              <button
                onClick={() => setShowCheckout(false)}
                className="rounded-lg px-3 py-2 text-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={placeOrder}
              className="mt-6 space-y-4"
            >
              <input
                type="text"
                value={checkoutName}
                onChange={(event) =>
                  setCheckoutName(event.target.value)
                }
                placeholder="Full Name"
                className="input-style"
              />

              <input
                type="tel"
                value={checkoutPhone}
                onChange={(event) =>
                  setCheckoutPhone(event.target.value)
                }
                placeholder="Phone Number"
                className="input-style"
              />

              <textarea
                value={checkoutAddress}
                onChange={(event) =>
                  setCheckoutAddress(event.target.value)
                }
                placeholder="Full Address"
                className="input-style"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={checkoutCity}
                  onChange={(event) =>
                    setCheckoutCity(event.target.value)
                  }
                  placeholder="City"
                  className="input-style"
                />

                <input
                  type="text"
                  value={checkoutPin}
                  onChange={(event) =>
                    setCheckoutPin(event.target.value)
                  }
                  placeholder="PIN Code"
                  className="input-style"
                />
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex justify-between">
                  <span>Order Total</span>

                  <span className="text-xl font-black">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          ORDERS MODAL
      ======================================================== */}

      {showOrders && (
        <div className="modal-bg">
          <div className="modal-card max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  My Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your Cloud Cart order history
                </p>
              </div>

              <button
                onClick={() => setShowOrders(false)}
                className="rounded-lg px-3 py-2 text-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 max-h-[70vh] overflow-y-auto">
              {orders.filter(
                (order) =>
                  !user || order.userId === user.id
              ).length === 0 ? (
                <div className="py-16 text-center">
                  <div className="text-6xl">📦</div>

                  <h3 className="mt-4 text-xl font-bold">
                    No orders yet
                  </h3>
                </div>
              ) : (
                <div className="space-y-5">
                  {orders
                    .filter(
                      (order) =>
                        !user ||
                        order.userId === user.id
                    )
                    .map((order) => (
                      <div
                        key={order.id}
                        className="rounded-2xl border border-slate-200 p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-black">
                              {order.id}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {order.date}
                            </p>
                          </div>

                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                            {order.status}
                          </span>
                        </div>

                        <div className="mt-5 space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-14 w-14 rounded-lg object-cover"
                              />

                              <div className="flex-1">
                                <p className="font-bold">
                                  {item.name}
                                </p>

                                <p className="text-sm text-slate-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>

                              <p className="font-bold">
                                ₹
                                {(
                                  item.price *
                                  item.quantity
                                ).toLocaleString("en-IN")}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 border-t border-slate-200 pt-4">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>
                              ₹
                              {order.subtotal.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>

                          <div className="mt-2 flex justify-between text-sm">
                            <span>Delivery</span>
                            <span>
                              ₹
                              {order.delivery.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>

                          <div className="mt-2 flex justify-between text-sm text-green-600">
                            <span>Discount</span>
                            <span>
                              -₹
                              {order.discount.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>

                          <div className="mt-3 flex justify-between text-lg font-black">
                            <span>Total</span>
                            <span>
                              ₹
                              {order.total.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}