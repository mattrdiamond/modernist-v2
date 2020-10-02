import React, { useState, useRef } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import Spinner from "../spinner/spinner.component";
import { newsletter2x, newsletter1x } from "../../assets/img/_images";
import useOnScreen from "../../utils/use-on-screen";
import "./newsletter-signup.styles.scss";

const NewsletterSignup = () => {
  // useOnScreen (Intersection observer) - setRef will update the ref state in useOnScreen with the referenced DOM element and return visible status (isIntersecting)
  const [setRef, visible] = useOnScreen({ threshold: 0.5 });

  // status message will display error or success message below form input
  const statusMessage = useRef(null);

  const [email, setEmail] = useState("");
  const [mailchimpStatus, setMailchimpStatus] = useState({
    message: "",
    result: "",
    loading: false,
  });
  const { message, result, loading } = mailchimpStatus;

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = (event) => {
    // Only run on forms flagged for validation
    if (!event.target.classList.contains("validate")) return;

    event.preventDefault();

    setMailchimpStatus({ ...mailchimpStatus, loading: true });
    submitMailChimpForm(event.target);
  };

  const submitMailChimpForm = (form) => {
    // 1. Get the Submit URL from the form’s action attribute
    // 2. Replace the /post?u= within the URL with /post-json?u= and add serialized form data to url
    // 3. Add displayMailChimpStatus callback to url (c is query string key for callback).
    //    Note: JSONP is used to get around cross-domain security errors by returning data as a
    //    script element in the document which then passes that data into a callback
    let url = form.getAttribute("action");
    url = url.replace("/post?u=", "/post-json?u=");
    url += serialize(form) + "&c=displayMailChimpStatus";

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

    // Update state and display error (remove the number and dash that appears before the error)
    setMailchimpStatus({
      message: data.msg.replace(/^([0-9] - )/g, ""),
      result: data.result,
      loading: false,
    });
    // Focus on error message
    statusMessage.current.focus();
  };

  console.log("render newsletter");

  return (
    <section className="newsletter-signup" ref={setRef}>
      <div className="page-width content-wrapper">
        <div className="img-container">
          <img
            src={newsletter1x}
            srcSet={`${newsletter2x} 2x, ${newsletter1x} 1x`}
            alt="Stack of pillows"
            className={"newsletter-img" + (visible ? " visible" : "")}
          />
        </div>
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
            <h2>Join the club.</h2>
            <p>
              Sign up to recieve product news, promotions&nbsp;and&nbsp;updates.
            </p>
            {/* hide input if email successfully added and show success message */}
            {result !== "success" ? (
              <FormInput
                name="EMAIL"
                type="email"
                aria-label="Email"
                title="The domain portion of the email address is invalid (the portion after the @)."
                pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$"
                label="email"
                id="mce-EMAIL"
                handleChange={handleChange}
                value={email}
                required
              >
                <div className="btn-container">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <CustomButton
                      type="submit"
                      value="Subscribe"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      disabled={!email}
                      inline
                    >
                      Submit
                    </CustomButton>
                  )}
                </div>
              </FormInput>
            ) : null}
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
            {message ? (
              <div
                className={`mc-status ${
                  result === "success" ? "success-message" : "error-message"
                }`}
                tabIndex={message ? 0 : -1}
                ref={statusMessage}
              >
                {message}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default React.memo(NewsletterSignup);
