import { useEffect, useMemo, useState } from 'react'
import './App.css'

const cooks = [
  {
    id: 1,
    name: 'Archana Kumari',
    cuisine: 'North Indian',
    rating: 4.9,
    price: '₹299 / meal',
    location: 'Koramangala',
    delivery: 'Lunch 12:30 PM - 2:30 PM',
    badge: 'Verified',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    specialties: ['Dal Tadka', 'Paneer Bhurji', 'Curd Rice'],
    menu: [
      { name: 'Dal Tadka', type: 'Veg', desc: 'Yellow lentils cooked with cumin, tomatoes, and a touch of ghee.', price: '₹180', plan: 'Daily' },
      { name: 'Paneer Bhurji', type: 'Veg', desc: 'Soft paneer tossed with onion, peppers, and aromatic spices.', price: '₹220', plan: 'Weekly' },
      { name: 'Chicken Curry Bowl', type: 'Non-Veg', desc: 'Home-style chicken curry with rice and seasonal veggies.', price: '₹320', plan: 'Monthly' },
      { name: 'Veg Biryani', type: 'Veg', desc: 'Fragrant rice with vegetables, mint, and saffron notes.', price: '₹260', plan: 'Daily' },
    ],
    reviews: [
      { user: 'Ananya', text: 'Fresh, tasty, and truly home-style food. Excellent packaging!', rating: 5 },
      { user: 'Raghav', text: 'Healthy and affordable meal plan. Delivery is always on time.', rating: 4.8 },
    ],
  },
  {
    id: 2,
    name: 'Ritika Nair',
    cuisine: 'South Indian',
    rating: 4.8,
    price: '₹249 / meal',
    location: 'HSR Layout',
    delivery: 'Breakfast 7:00 AM - 9:30 AM',
    badge: 'Top Rated',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    specialties: ['Idli Sambar', 'Avial', 'Coconut Rice'],
    menu: [
      { name: 'Idli Sambar', type: 'Veg', desc: 'Steamed rice cakes served with fresh sambar and chutney.', price: '₹160', plan: 'Daily' },
      { name: 'Avial', type: 'Veg', desc: 'A healthy mix of vegetables in a mild coconut gravy.', price: '₹210', plan: 'Weekly' },
      { name: 'Fish Curry', type: 'Non-Veg', desc: 'Coastal fish curry with rice and a spicy coconut base.', price: '₹350', plan: 'Monthly' },
      { name: 'Coconut Rice', type: 'Veg', desc: 'Light, fragrant rice with coconut and curry leaves.', price: '₹190', plan: 'Daily' },
    ],
    reviews: [
      { user: 'Neha', text: 'Loved the taste and the simple ingredients. Very comforting.', rating: 4.9 },
      { user: 'Sahil', text: 'Good for lunch subscriptions and very hygienic.', rating: 4.7 },
    ],
  },
  {
    id: 3,
    name: 'Sajida Begum',
    cuisine: 'Hyderabadi',
    rating: 4.7,
    price: '₹289 / meal',
    location: 'Jayanagar',
    delivery: 'Dinner 7:00 PM - 9:00 PM',
    badge: 'New Chef',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    specialties: ['Biryani', 'Mirchi ka Salan', 'Baghara Rice'],
    menu: [
      { name: 'Chicken Dum Biryani', type: 'Non-Veg', desc: 'Fragrant biryani layered with basmati rice and tender chicken.', price: '₹340', plan: 'Monthly' },
      { name: 'Veg Dum Biryani', type: 'Veg', desc: 'Classic biryani packed with vegetables, herbs, and spices.', price: '₹260', plan: 'Weekly' },
      { name: 'Mirchi ka Salan', type: 'Veg', desc: 'A rich and tangy Hyderabadi side with roasted chilies.', price: '₹180', plan: 'Daily' },
      { name: 'Baghara Rice', type: 'Veg', desc: 'Aromatic rice with peanuts, curry leaves, and ghee.', price: '₹190', plan: 'Daily' },
    ],
    reviews: [
      { user: 'Ishita', text: 'Authentic Hyderabadi flavors and lovely service.', rating: 4.8 },
      { user: 'Karthik', text: 'Great meal quality for working families.', rating: 4.6 },
    ],
  },
]

const orderHistory = [
  { id: '#H1942', item: 'Veg Thali', status: 'Delivered', amount: '₹320' },
  { id: '#H1919', item: 'Chicken Curry Bowl', status: 'Preparing', amount: '₹420' },
  { id: '#H1888', item: 'Coconut Rice Set', status: 'Delivered', amount: '₹240' },
]

const subscriptions = [
  { title: 'Weekly Balance', chef: 'Archana Kumari', meals: '5 meals/week', amount: '₹1,450' },
  { title: 'Healthy Lunch Plan', chef: 'Ritika Nair', meals: '10 meals/month', amount: '₹2,400' },
]

const cookSummary = [
  { label: 'This Month', value: '₹28.4K', note: 'Earnings' },
  { label: 'Orders', value: '164', note: 'Completed' },
  { label: 'Subscribers', value: '43', note: 'Active' },
  { label: 'Rating', value: '4.9/5', note: 'Average' },
]

const adminStats = [
  { label: 'Users', value: '12.4K' },
  { label: 'Cooks', value: '328' },
  { label: 'Orders', value: '4,210' },
  { label: 'Approvals', value: '87' },
]

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentView, setCurrentView] = useState('welcome')
  const [authMode, setAuthMode] = useState(null)
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', city: '' })
  const [authError, setAuthError] = useState('')
  const [accounts, setAccounts] = useState([])
  const [toast, setToast] = useState({ visible: false, type: 'success', message: '' })
  const [search, setSearch] = useState('')
  const [mealType, setMealType] = useState('All')
  const [mealPlan, setMealPlan] = useState('All')
  const [priceRange, setPriceRange] = useState('Any')
  const [cuisine, setCuisine] = useState('All')
  const [location, setLocation] = useState('All')
  const [selectedCook, setSelectedCook] = useState(cooks[0])
  const [orders, setOrders] = useState(orderHistory)
  const [activeSubscriptions, setActiveSubscriptions] = useState(subscriptions)
  const [menuAvailability, setMenuAvailability] = useState({ 'Paneer Bhurji': true, 'Chicken Curry Bowl': false })
  const [pendingApprovals, setPendingApprovals] = useState(['Shalini R.', 'Aditya K.'])

  useEffect(() => {
    if (!toast.visible) return undefined
    const timer = setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }))
    }, 2200)
    return () => clearTimeout(timer)
  }, [toast.visible])

  const filteredCooks = useMemo(() => {
    return cooks.filter((cook) => {
      const matchesSearch = cook.name.toLowerCase().includes(search.toLowerCase()) || cook.cuisine.toLowerCase().includes(search.toLowerCase())
      const matchesType = mealType === 'All' || cook.menu.some((item) => item.type === mealType)
      const matchesPlan = mealPlan === 'All' || cook.menu.some((item) => item.plan === mealPlan)
      const matchesCuisine = cuisine === 'All' || cook.cuisine === cuisine
      const matchesLocation = location === 'All' || cook.location === location
      const price = Number(cook.price.match(/\d+/)?.[0] ?? 0)
      const matchesPrice = priceRange === 'Any'
        || (priceRange === 'Low' && price >= 150 && price <= 250)
        || (priceRange === 'Mid' && price > 250 && price <= 350)
        || (priceRange === 'High' && price > 350)

      return matchesSearch && matchesType && matchesPlan && matchesCuisine && matchesLocation && matchesPrice
    })
  }, [search, mealType, mealPlan, priceRange, cuisine, location])

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, type, message })
  }

  const openAuthForm = (mode) => {
    setAuthMode(mode)
    setAuthError('')
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()
    setAuthError('')

    const email = authForm.email.trim().toLowerCase()
    if (authMode === 'signup') {
      if (authForm.password.length < 8) {
        setAuthError('Password must be at least 8 characters.')
        return
      }
      if (accounts.some((account) => account.email === email)) {
        setAuthError('An account with this email already exists. Please log in.')
        return
      }

      const account = { name: authForm.name.trim(), email, city: authForm.city.trim(), password: authForm.password }
      setAccounts((items) => [...items, account])
      setCurrentUser(account)
      setCurrentView('dashboard')
      setAuthMode(null)
      showToast(`Welcome to HomeFeast, ${account.name.split(' ')[0]}!`)
      return
    }

    const account = accounts.find((item) => item.email === email && item.password === authForm.password)
    if (!account) {
      setAuthError('Email or password is incorrect. Create an account first if you are new.')
      return
    }

    setCurrentUser(account)
    setCurrentView('dashboard')
    setAuthMode(null)
    showToast(`Welcome back, ${account.name.split(' ')[0]}!`)
  }

  const handleSubscribe = (cookName) => {
    setActiveSubscriptions((items) => [
      { title: `${cookName} meal plan`, chef: cookName, meals: '5 meals/week', amount: '₹1,450' },
      ...items,
    ])
    setCurrentView('subscriptions')
    showToast(`Added a meal plan with ${cookName}`)
  }

  const handleAddOrder = (dish, cookName) => {
    setOrders((items) => [
      { id: `#H${Date.now().toString().slice(-5)}`, item: `${dish.name} · ${cookName}`, status: 'Preparing', amount: dish.price },
      ...items,
    ])
    setCurrentView('orders')
    showToast(`${dish.name} added to your orders`)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('welcome')
    setAuthForm({ name: '', email: '', password: '', city: '' })
    setAuthMode('login')
    showToast('You have been logged out')
  }

  const handleOrderAction = (action) => {
    showToast(action === 'accepted' ? 'Subscription accepted' : 'Subscription rejected', action === 'accepted' ? 'success' : 'error')
  }

  const renderWelcomeScreen = () => (
    <div className="welcome-shell">
      <header className="welcome-header">
        <div className="brand">
          <span className="brand-mark">H</span>
          <div>
            <strong>HomeFeast</strong>
            <small>Homemade tiffin service</small>
          </div>
        </div>
      </header>

      <main className="welcome-content">
        <div className="welcome-copy">
          <p className="eyebrow warm">Fresh from home kitchens</p>
          <h1>Healthy, homemade meals for your everyday routine.</h1>
          <p className="lead">
            Discover trusted home cooks, flexible tiffin subscriptions, and nourishing food designed around your schedule.
          </p>
          {authMode ? (
            <form className="auth-form" onSubmit={handleAuthSubmit}>
              <h2>{authMode === 'login' ? 'Log in' : 'Create your account'}</h2>
              {authMode === 'signup' && (
                <>
                  <label htmlFor="auth-name">Name</label>
                  <input id="auth-name" autoComplete="name" required value={authForm.name} onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })} />
                  <label htmlFor="auth-city">City</label>
                  <input id="auth-city" autoComplete="address-level2" required value={authForm.city} onChange={(event) => setAuthForm({ ...authForm, city: event.target.value })} />
                </>
              )}
              <label htmlFor="auth-email">Email</label>
              <input id="auth-email" type="email" autoComplete="email" required value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} />
              <label htmlFor="auth-password">Password</label>
              <input id="auth-password" type="password" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} minLength={8} required value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} />
              {authError && <p className="auth-error" role="alert">{authError}</p>}
              <button type="submit" className="action-btn primary full">{authMode === 'login' ? 'Login' : 'Create account'}</button>
              <button type="button" className="auth-switch" onClick={() => openAuthForm(authMode === 'login' ? 'signup' : 'login')}>
                {authMode === 'login' ? 'New here? Sign up' : 'Already have an account? Log in'}
              </button>
            </form>
          ) : (
            <div className="welcome-actions">
              <button type="button" className="action-btn primary" onClick={() => openAuthForm('login')}>Login</button>
              <button type="button" className="action-btn secondary" onClick={() => openAuthForm('signup')}>Sign Up</button>
            </div>
          )}
          <div className="mini-stats">
            <div>
              <strong>2.3K+</strong>
              <span>happy users</span>
            </div>
            <div>
              <strong>320+</strong>
              <span>verified cooks</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>average rating</span>
            </div>
          </div>
        </div>

        <div className="welcome-card">
          <div className="card-glow" />
          <div className="feature-tag">Daily home-style meals</div>
          <div className="plate-preview">
            <div className="plate-circle" />
            <div className="food-item item-one" />
            <div className="food-item item-two" />
            <div className="food-item item-three" />
          </div>
          <div className="preview-row">
            <div>
              <span className="label-text">Popular</span>
              <strong>Veg Thali</strong>
            </div>
            <strong>₹249</strong>
          </div>
        </div>
      </main>
    </div>
  )

  const renderDashboard = () => (
    <>
      <div className="page-panel">
        <div className="header-row">
          <div>
            <p className="eyebrow">Good morning</p>
            <h2>Hello, {currentUser.name.split(' ')[0]}!</h2>
          </div>
        </div>

        <div className="search-panel">
          <input
            type="text"
            placeholder="Search cooks or cuisines"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filter-grid">
            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
              <option value="All">Veg/Non-Veg</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
            <select value={mealPlan} onChange={(e) => setMealPlan(e.target.value)}>
              <option value="All">Meal plan</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="Any">Price</option>
              <option value="Low">₹150-₹250</option>
              <option value="Mid">₹250-₹350</option>
              <option value="High">₹350+</option>
            </select>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
              <option value="All">Cuisine</option>
              <option value="North Indian">North Indian</option>
              <option value="South Indian">South Indian</option>
              <option value="Hyderabadi">Hyderabadi</option>
            </select>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="All">Location</option>
              <option value="Koramangala">Koramangala</option>
              <option value="HSR Layout">HSR Layout</option>
              <option value="Jayanagar">Jayanagar</option>
            </select>
          </div>
        </div>
      </div>

      <div className="cook-grid">
        {filteredCooks.map((cookItem) => (
            <article key={cookItem.id} className="cook-card">
              <img src={cookItem.image} alt={cookItem.name} />
              <div className="cook-card-body">
                <div className="cook-topline">
                  <div>
                    <h3>{cookItem.name}</h3>
                    <span>{cookItem.cuisine}</span>
                  </div>
                  <div className="rating-pill">★ {cookItem.rating}</div>
                </div>
                <div className="meta-row">
                  <span>{cookItem.location}</span>
                  <span>{cookItem.price}</span>
                </div>
                <div className="specialties">
                  {cookItem.specialties.map((specialty) => (
                    <span key={specialty}>{specialty}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className="action-btn primary full"
                  onClick={() => {
                    setSelectedCook(cookItem)
                    setCurrentView('cook-detail')
                  }}
                >
                  View menu
                </button>
              </div>
            </article>
        ))}
      </div>
    </>
  )

  const renderCookDetail = () => (
    <div className="page-panel detail-panel">
      <button type="button" className="back-link" onClick={() => setCurrentView('dashboard')}>← Back</button>

      <div className="detail-header">
        <img src={selectedCook.image} alt={selectedCook.name} />
        <div className="detail-info">
          <div className="title-row">
            <div>
              <p className="eyebrow">Verified cook</p>
              <h2>{selectedCook.name}</h2>
            </div>
            <span className="verification-badge">{selectedCook.badge}</span>
          </div>
          <div className="meta-row detail-meta">
            <span>★ {selectedCook.rating}</span>
            <span>{selectedCook.location}</span>
            <span>{selectedCook.delivery}</span>
          </div>
          <p className="detail-copy">Serving fresh home-style meals with authentic flavors and clean ingredients.</p>
        </div>
      </div>

      <div className="menu-section">
        <div className="section-header">
          <h3>Full menu</h3>
          <button type="button" className="action-btn secondary small" onClick={() => handleSubscribe(selectedCook.name)}>Subscribe</button>
        </div>
        <div className="dish-list">
          {selectedCook.menu.map((dish) => (
            <div key={dish.name} className="dish-item">
              <div>
                <div className="dish-topline">
                  <h4>{dish.name}</h4>
                  <span className={`dish-pill ${dish.type === 'Veg' ? 'veg' : 'nonveg'}`}>{dish.type}</span>
                </div>
                <p>{dish.desc}</p>
                <div className="dish-meta">
                  <span>{dish.plan}</span>
                  <strong>{dish.price}</strong>
                </div>
              </div>
              <button type="button" className="action-btn primary small" onClick={() => handleAddOrder(dish, selectedCook.name)}>Add</button>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-panel">
        <h3>Customer reviews</h3>
        <div className="review-list">
          {selectedCook.reviews.map((review) => (
            <div key={review.user} className="review-item">
              <div className="review-head">
                <strong>{review.user}</strong>
                <span>★ {review.rating}</span>
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderOrders = () => (
    <div className="page-panel">
      <div className="section-header">
        <h2>Orders</h2>
        <button type="button" className="action-btn secondary small" onClick={() => showToast(orders[0] ? `${orders[0].id}: ${orders[0].status}` : 'No orders to track', 'success')}>Track latest</button>
      </div>
      <div className="list-stack">
        {orders.map((order) => (
          <div key={order.id} className="list-item">
            <div>
              <strong>{order.item}</strong>
              <p>{order.id}</p>
            </div>
            <div className="status-block">
              <span className={order.status === 'Delivered' ? 'status delivered' : 'status preparing'}>{order.status}</span>
              <strong>{order.amount}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSubscriptions = () => (
    <div className="page-panel">
      <div className="section-header">
        <h2>Subscriptions</h2>
        <button type="button" className="action-btn secondary small" onClick={() => showToast(`${activeSubscriptions.length} active subscription${activeSubscriptions.length === 1 ? '' : 's'}`)}>Manage</button>
      </div>
      <div className="subscription-list">
        {activeSubscriptions.map((plan, index) => (
          <div key={`${plan.title}-${index}`} className="subscription-card">
            <div>
              <h3>{plan.title}</h3>
              <p>{plan.chef}</p>
            </div>
            <div className="plan-meta">
              <span>{plan.meals}</span>
              <strong>{plan.amount}</strong>
            </div>
            <button type="button" className="action-btn secondary small" onClick={() => {
              setActiveSubscriptions((items) => items.filter((_, itemIndex) => itemIndex !== index))
              showToast('Subscription cancelled')
            }}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="page-panel profile-card">
      <div className="profile-head">
        <div className="avatar">AK</div>
        <div>
          <h2>{currentUser.name}</h2>
          <p>{currentUser.email}</p>
        </div>
      </div>
      <div className="profile-info">
        <div>
          <span>City</span>
          <strong>{currentUser.city}</strong>
        </div>
        <div>
          <span>Current plan</span>
          <strong>Customer</strong>
        </div>
      </div>
      <button type="button" className="action-btn primary full" onClick={handleLogout}>Logout</button>
    </div>
  )

  const renderCookDashboard = () => (
    <div className="page-panel">
      <div className="section-header">
        <h2>Cook dashboard</h2>
        <button type="button" className="action-btn secondary small" onClick={() => setCurrentView('dashboard')}>Customer view</button>
      </div>

      <div className="summary-grid">
        {cookSummary.map((item) => (
          <div key={item.label} className="summary-box">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.note}</small>
          </div>
        ))}
      </div>

      <div className="cook-dashboard-grid">
        <div className="dashboard-box">
          <h3>Menu management</h3>
          <div className="menu-row">
            <span>Paneer Bhurji</span>
            <button type="button" className={`toggle ${menuAvailability['Paneer Bhurji'] ? 'on' : 'off'}`} onClick={() => setMenuAvailability((items) => ({ ...items, 'Paneer Bhurji': !items['Paneer Bhurji'] }))}>{menuAvailability['Paneer Bhurji'] ? 'Available' : 'Paused'}</button>
          </div>
          <div className="menu-row">
            <span>Chicken Curry Bowl</span>
            <button type="button" className={`toggle ${menuAvailability['Chicken Curry Bowl'] ? 'on' : 'off'}`} onClick={() => setMenuAvailability((items) => ({ ...items, 'Chicken Curry Bowl': !items['Chicken Curry Bowl'] }))}>{menuAvailability['Chicken Curry Bowl'] ? 'Available' : 'Paused'}</button>
          </div>
        </div>

        <div className="dashboard-box">
          <h3>Subscription requests</h3>
          <div className="request-item">
            <div>
              <strong>Riya M.</strong>
              <p>Weekly vegetarian plan</p>
            </div>
            <div className="request-actions">
              <button type="button" className="small action-btn primary" onClick={() => handleOrderAction('accepted')}>Accept</button>
              <button type="button" className="small action-btn secondary" onClick={() => handleOrderAction('rejected')}>Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAdminDashboard = () => (
    <div className="page-panel">
      <div className="section-header">
        <h2>Admin dashboard</h2>
      </div>

      <div className="summary-grid">
        {adminStats.map((item) => (
          <div key={item.label} className="summary-box admin-box">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="admin-grid">
        <div className="dashboard-box">
          <h3>Pending cook approvals</h3>
          {pendingApprovals.map((name) => (
            <div className="request-item" key={name}>
              <div>
                <strong>{name}</strong>
                <p>Cook application pending review</p>
              </div>
              <button type="button" className="action-btn primary small" onClick={() => {
                setPendingApprovals((items) => items.filter((item) => item !== name))
                showToast(`${name} approved`)
              }}>Approve</button>
            </div>
          ))}
        </div>

        <div className="dashboard-box">
          <h3>Category oversight</h3>
          <ul className="mini-list">
            <li>Veg</li>
            <li>Non-Veg</li>
            <li>South Indian</li>
            <li>North Indian</li>
            <li>Healthy meals</li>
          </ul>
        </div>
      </div>
    </div>
  )

  const navItems = [
    { label: 'Home', value: 'dashboard' },
    { label: 'Orders', value: 'orders' },
    { label: 'Subscriptions', value: 'subscriptions' },
    { label: 'Profile', value: 'profile' },
  ]

  return (
    <div className="app-shell">
      {toast.visible && <div className={`toast ${toast.type}`}>{toast.message}</div>}

      {!currentUser ? (
        renderWelcomeScreen()
      ) : (
        <>
          <header className="user-header">
            <div className="brand compact">
              <span className="brand-mark">H</span>
              <div>
                <strong>HomeFeast</strong>
              </div>
            </div>
            <button type="button" className="avatar-button" aria-label="Open profile" onClick={() => setCurrentView('profile')}>{currentUser.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</button>
          </header>

          <main className="app-main">
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'cook-detail' && renderCookDetail()}
            {currentView === 'orders' && renderOrders()}
            {currentView === 'subscriptions' && renderSubscriptions()}
            {currentView === 'profile' && renderProfile()}
            {currentView === 'cook-dashboard' && renderCookDashboard()}
            {currentView === 'admin-dashboard' && renderAdminDashboard()}
          </main>

          <nav className="bottom-nav">
            {navItems.map((item) => (
              <button
                key={item.value}
                type="button"
                className={currentView === item.value ? 'nav-item active' : 'nav-item'}
                onClick={() => setCurrentView(item.value)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </>
      )}
    </div>
  )
}

export default App
