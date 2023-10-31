import React from "react";

export default function ShippingAccordionContent() {
  return (
    <section className='shipping-returns-section'>
      <div className='heading-with-icon'>
        <svg
          className='icon icon-delivery-options'
          xmlns='http://www.w3.org/2000/svg'
          x='0'
          y='0'
          version='1.1'
          viewBox='0 0 30 30'
        >
          <path d='m28 9.6-10.7 4.6L6.5 9.6h0L17.3 5 28 9.6zM11.7 11.9l10.8-4.6M17.3 25V14.2M6.5 12.9V9.6M28 9.6v10.8L17.3 25l-9.1-3.9M2 14.7h6.2M5.4 17h5.1M3.1 19.2h5.7' />
        </svg>
        <h5>Flat Rate Delivery Fee</h5>
      </div>
      <p>
        Shipping costs are indicated on each item's page and will be
        automatically calculated during the checkout. For purchases totaling
        $100 or more, Modernist offers FREE SHIPPING, unless otherwise specified
        on the item's page. Orders under $100 incur a flat shipping fee of $5
        per item. Please note that certain manufacturers may impose mandatory
        shipping charges.
      </p>
      <div className='heading-with-icon'>
        <svg
          className='icon icon-delivery-options icon-service'
          xmlns='http://www.w3.org/2000/svg'
          x='0'
          y='0'
          version='1.1'
          viewBox='0 0 30 30'
        >
          <path d='M19.3 27h6.5V16.6H13.3v4.9M20.5 14.8l-.3-.8c-.3-.4-.6-.8-1.2-.9l-2.5-.3' />
          <path d='m10 12.8-2.9.7c-.6.2-1 .7-1.2 1.3L4 21.5c-.2.9.6 2.5 1.5 2.8l7.2 2.6s2.6.5 4.2.5c.6-.4 1.1-1.8.6-2.7l-1.9-.7s-.2-.4-.4-.6c-.8 0-2 .1-2 .1L8.7 21l.5-1.5M7.8 25.2v2.3M16.5 8.4v.5c0 .7-.3 1.3-.7 1.8l-1.1 1.2c-.8.8-2 .8-2.8 0l-1.1-1.2c-.5-.5-.8-1.1-.8-1.8V5.2c0-1.5 1.2-2.7 2.7-2.7h1.1c1.5 0 2.7 1.2 2.7 2.7v1.6M11.6 6.8h8.2M20.9 16.6v2.2h-2.7v-2.2' />
        </svg>
        <h5>White Glove Service</h5>
      </div>
      <p>
        If having the item delivered into your home as White Glove, it will be
        brought in by a skilled delivery team on a pre-scheduled date, unpacked
        in the room of your choice and fully assembled. (Doorstep Delivery does
        not include room placement or assembly).{" "}
      </p>
      <div className='heading-with-icon'>
        <svg
          className='icon icon-delivery-options'
          xmlns='http://www.w3.org/2000/svg'
          x='0'
          y='0'
          version='1.1'
          viewBox='0 0 30 30'
        >
          <path d='M22.1 22.7h3v3' />
          <path d='M3.6 9.9c-.7 1.6-1.1 3.3-1.1 5.1 0 3.2 1.2 6.4 3.7 8.9 2.4 2.4 5.6 3.6 8.8 3.6 3.5 0 6-1 8.3-3 .4-.3 1.8-1.8 1.8-1.8M26.4 20.1c.7-1.6 1.1-3.3 1.1-5.1 0-3.2-1.2-6.4-3.7-8.9-2.4-2.4-5.6-3.6-8.8-3.6-3.5 0-6 1-8.3 3-.4.3-1.8 1.8-1.8 1.8' />
          <path d='M7.9 7.3h-3v-3M7.3 10.8l7.7 3.6 7.7-3.6M10.9 12.5l7.7-3.6' />
          <path d='M7.3 10.8v8.4l7.7 3.5 7.7-3.5v-8.4M7.3 10.8 15 7.3l7.7 3.5M15 14.4v8.3' />
        </svg>
        <h5>Easy Returns</h5>
      </div>
      <p>
        You can return eligible items within 30 days of receiving an order or 7
        days for quick-ship upholstery items. Made-to-order items are not
        eligible.
      </p>
    </section>
  );
}
