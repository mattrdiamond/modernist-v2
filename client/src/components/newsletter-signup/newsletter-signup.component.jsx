import React, { useState, useRef } from "react";
import "./newsletter-signup.styles.scss";
import large from "../../assets/img/newsletter_2x.jpg";
import small from "../../assets/img/newsletter_1x.jpg";

const NewsletterSignup = () => {
  const statusMessage = useRef(null);

  const [email, setEmail] = useState("");
  const [mailchimpStatus, setMailchimpStatus] = useState({
    message: "",
    result: "",
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = (event) => {
    // Only run on forms flagged for validation
    if (!event.target.classList.contains("validate")) return;

    // Prevent form from submitting
    event.preventDefault();

    // Otherwise, let the form submit normally
    // You could also bolt in an Ajax form submit process here
    submitMailChimpForm(event.target);
  };

  const submitMailChimpForm = (form) => {
    // 1. Get the Submit URL from the form’s action attribute
    // 2. Replace the /post?u=' with in the URL with /post-json?u= and add serialized form data to url
    // 3. Add displayMailChimpStatus callback to url (c is query string key for callback).
    //    Note: JSONP is used to get around cross-domain security errors by returning data as a
    //    script element in the document which then passes that data into a callback
    let url = form.getAttribute("action");
    url = url.replace("/post?u=", "/post-json?u=");
    url += serialize(form) + "&c=displayMailChimpStatus";
    console.log("url", url);

    // Create script with url and callback (if specified)
    const script = window.document.createElement("script");
    script.src = url;

    // Insert script tag into the DOM
    const ref = window.document.getElementsByTagName("script")[0];
    ref.parentNode.insertBefore(script, ref);

    // tell script tag that callback is located in this component
    window.displayMailChimpStatus = displayMailChimpStatus;

    // After the script is loaded (and executed), remove it
    script.onload = function () {
      this.remove();
    };
  };

  // Serialize the form data into a query string
  const serialize = function (form) {
    // Setup our serialized data
    let serialized = "";

    // Loop through each field in the form
    for (let i = 0; i < form.elements.length; i++) {
      const field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (
        !field.name ||
        field.disabled ||
        field.type === "file" ||
        field.type === "reset" ||
        field.type === "submit" ||
        field.type === "button"
      )
        continue;

      // If it's not a checkbox or radio (catchall for select, textarea and various input types) or it is and it's checked,
      // convert it to key/value pair and add an '&' at the beginning and append to serialized string
      // also encode the key and value for use in a url, and then return serialized string
      if (
        (field.type !== "checkbox" && field.type !== "radio") ||
        field.checked
      ) {
        serialized +=
          "&" +
          encodeURIComponent(field.name) +
          "=" +
          encodeURIComponent(field.value);
      }
    }
    return serialized;
  };

  // Display the form status on the page
  const displayMailChimpStatus = function (data) {
    // Make sure the data is in the right format and has both keys
    if (!data.result || !data.msg) return;
    console.log("msg", data.msg);
    // Update state and display error (remove the number and dash that appears before the error)
    setMailchimpStatus({
      message: data.msg.replace(/^([0-9] - )/g, ""),
      result: data.result,
    });
    // focus on error message
    statusMessage.current.focus();
  };

  const { message, result } = mailchimpStatus;

  return (
    <section className="newsletter-signup">
      <img
        src={small}
        srcSet={`${large} 2x, ${small} 1x`}
        alt="Black lamp standing by a sofa in a living room"
        className="newsletter-img"
      ></img>
      <div className="newsletter-form">
        <form
          action="https://gmail.us8.list-manage.com/subscribe/post?u=a826694112117741e6cd0d13f&amp;id=946b9658d7"
          onSubmit={handleSubmit}
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          noValidate
        >
          <h2>Join the club!</h2>
          <p>Sign up to recieve product news, promotions and updates.</p>
          <div className="newsletter-container">
            <div>
              <input
                type="email"
                name="EMAIL"
                aria-label="Email"
                id="mce-EMAIL"
                title="The domain portion of the email address is invalid (the portion after the @)."
                pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$"
                placeholder="email"
                onChange={handleChange}
                value={email}
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button"
              />
            </div>
          </div>
          {/* hidden input prevents form bot signups */}
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_f2d244c0df42a0431bd08ddea_aeaa9dd034"
              tabIndex="-1"
              readOnly
              value=""
            />
          </div>
          <div
            className={`mc-status ${
              result === "success" ? "success-message" : "error-message"
            }`}
            tabIndex={message ? 0 : -1}
            ref={statusMessage}
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
