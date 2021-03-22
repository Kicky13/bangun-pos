import mock from './mock'

/* eslint-disable import/extensions */

// JWT
import './jwt'

// Table
import './data/extensions/sales-data-pending'
import './data/extensions/customer-data-user'
import './data/extensions/customer-data-trans'
import './data/extensions/app-data'
import './data/master/customer'
import './data/master/price'
import './data/master/product'
import './data/master/tokoBangunan'
import './data/extensions/sales-data-user'
import './data/extensions/sales-data'
import './data/extensions/good-table'
import './data/extensions/auto-suggest'
import './data/card/card-statistics'
import './data/card/card-analytics'

// Apps
import './data/apps/calendar'
import './data/apps/user'
import './data/apps/email'
import './data/apps/invoice'
import './data/apps/todo'
import './data/apps/chat'
import './data/apps/eCommerce'

// dashboard
import './data/dashboard/analytics'
import './data/dashboard/ecommerce'

// pages
import './data/pages/faq-data'
import './data/pages/knowledge-base'
import './data/pages/pricing-data'
import './data/pages/account-setting'
import './data/pages/profile-data'
import './data/pages/blog'
/* eslint-enable import/extensions */

mock.onAny().passThrough() // forwards the matched request over network
