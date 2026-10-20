# Placeholders and integration points
`{{token}}` text marks a value the senior engineer supplies from WordPress/WooCommerce. In the HTML each appears inside `<span class="dbs-placeholder">`. Replace the whole span (not just the token) when populating. Nothing is calculated or verified by the front end.

## Required tokens
| Token | Expected value | Future source | Pages using it |
|---|---|---|---|
| `{{site_name}}` | Business name | WordPress: get_bloginfo("name") | 31 |
| `{{logo_url}}` | URL of approved logo image | Custom logo: wp_get_attachment_image_url(get_theme_mod("custom_logo")) | 31 |
| `{{support_email}}` | Verified support email | Theme option / WP admin email | 31 |
| `{{support_phone}}` | Verified phone | Theme option | 31 |
| `{{business_address}}` | Verified address | Theme option / WooCommerce store address | 31 |
| `{{privacy_policy_url}}` | Privacy policy URL | get_privacy_policy_url() | 31 |
| `{{terms_url}}` | Terms URL | wc_terms_and_conditions_page_id() → get_permalink() | 31 |
| `{{customer_name}}` | Logged-in customer display name | WC_Customer / wp_get_current_user() | 2 |
| `{{customer_email}}` | Customer email | WC_Customer::get_email() | 1 |
| `{{order_number}}` | Order number | WC_Order::get_order_number() | 5 |
| `{{order_date}}` | Order date | WC_Order::get_date_created() formatted | 3 |
| `{{order_status}}` | Order status label | wc_get_order_status_name() | 3 |
| `{{order_items}}` | Order line items | WC_Order::get_items() | 2 |
| `{{subtotal}}` | Subtotal | WC_Order::get_subtotal() / WC()->cart->get_cart_subtotal() | 4 |
| `{{shipping_cost}}` | Shipping cost | WC_Order::get_shipping_total() / cart shipping total | 5 |
| `{{total}}` | Total payable | WC_Order::get_total() / WC()->cart->get_total() | 9 |
| `{{deposit_paid}}` | Deposit already paid | Deposit plugin order meta (verify plugin) | 4 |
| `{{outstanding_balance}}` | Balance remaining | Deposit plugin order meta (verify plugin) | 7 |
| `{{payment_status}}` | Payment status | Order status + PayFast ITN-verified state (server-side only) | 5 |
| `{{payment_method}}` | Payment method title | WC_Order::get_payment_method_title() | 2 |
| `{{shipping_address}}` | Formatted shipping address | WC_Order::get_formatted_shipping_address() | 2 |
| `{{course_name}}` | Course / product name | WC_Product::get_name() | 2 |
| `{{course_access_status}}` | Course access state | Course/LMS plugin (to be verified) | 2 |

Tokens not placed in markup: none. (Logo/site name are carried as `data-dbs-site-name` / `data-dbs-logo-url` on the header logo link; privacy and terms URLs as `data-dbs-url` on footer links.)

## Additional tokens
| Token | Meaning | Pages using it |
|---|---|---|
| `{{discount}}` | Discount total (cart/order) | 5 |
| `{{tax}}` | Tax total | 5 |
| `{{deposit_due_now}}` | Deposit payable now | 3 |
| `{{deposit_required}}` | Deposit amount required (deposit plugin) | 2 |
| `{{billing_address}}` | Formatted billing address | 1 |
| `{{business_hours}}` | Verified opening hours | 1 |
| `{{order_count}}` | Number of customer orders | 1 |
| `{{item_quantity}}` | Line quantity | 2 |
| `{{item_price}}` | Unit price | 1 |
| `{{item_option}}` | Variation/option label | 1 |
| `{{image}}` | Product image | 1 |
| `{{amount_paid}}` | Amount paid so far | 1 |
| `{{next_action}}` | Next payment action, if the backend supports one | 1 |
| `{{last_reviewed_date}}` | Legal page review date | 6 |
| `{{password_guidance}}` | Password rules from the existing WooCommerce setup | 1 |

## Editorial content slots
Legal, About and FAQ copy uses `{{content_…}}` tokens (61 slots, e.g. `{{content_verified_school_story}}`). These are copy to be supplied/approved by the business; no policy, price or business fact is written in these shells.

## Data hooks (not official WooCommerce hooks)
`data-dbs-page`, `data-dbs-cart-items`, `data-dbs-cart-summary`, `data-dbs-cart-count`, `data-dbs-qty`, `data-dbs-wp-route` (home/shop URL to map), `data-dbs-preview` (remove on production forms so native WooCommerce submission is used), `data-dbs-preview-notice`, `data-dbs-sample-price` / `data-dbs-sample-subtotal` / `data-dbs-line-total` (demo cart only; remove), `data-dbs-tabs`, `data-dbs-toggle`, `data-dbs-dismissible`, `data-dbs-nav-toggle`.

## Integration notes
- **Cart/checkout:** replace static markup with WooCommerce templates or blocks; keep the `dbs-` classes. Totals, shipping, tax, deposit and balance come only from WooCommerce / the deposit plugin. The cart quantity/subtotal arithmetic here is **sample-only** and must be deleted.
- **Auth/account:** forms post to WooCommerce endpoints (`my-account`, lost-password). Remove `data-dbs-preview`; map field names and nonces.
- **Payment status pages:** drive heading and message from server-verified status (PayFast ITN), never from query strings or arrival on the page.
- **Course access:** depends on the installed course plugin (unverified).
- Remove the preview banner, `index.html`, and `.dbs-state-gallery` sections before production.
