<script lang="ts">
  import "ui-web";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";
  import { z } from "zod";

  const { form, setFields, errors } = createForm({
    extend: validator({
      schema: z.object({
        emailAddress: z.string().trim().email("Invalid email address"),
        password: z.string().min(1),
      }),
    }),
    onSubmit: async (values) => {},
    onSuccess: () => {
      location.reload();
    },
    onError: (error: any) => {
      console.log(error.name);
      switch (error.name) {
        case "InternalErrorException":
        case "InvalidParameterException":
        case "ResourceNotFoundException":
        case "InvalidUserPoolConfigurationException":
        case "UnexpectedLambdaException":
        case "UserLambdaValidationException":
          return {
            general:
              "An internal error has occured, plase check your internet and try again",
          };
        case "NotAuthorizedException":
        case "UserNotFoundException":
          return {
            general: "Incorrect email or password",
          };
        case "TooManyRequestsException":
          return {
            general: "Sign in attempts exceeded, please try again later",
          };
        case "UserNotConfirmedException":
          return {
            emailAddress:
              "Your email has not yet been verified, please check your inbox",
          };
        case "User is disabled.":
          return {
            general:
              "This account is disabled, blease contack our support to resolve the issue",
          };
        default:
          return { emailAddress: error.message, password: null };
      }
    },
  });

  const handleInput = (event: any) => {
    setFields(event.target.name, event.target.value, false);
  };

  const handleChange = (event: any) => {
    setFields(event.target.name, event.target.value, true);
  };

  const signOut = (event: any): void => {};
</script>

<form method="post" style="padding: 1rem; width: 20rem" use:form>
  <p>
    <js-input
      name="emailAddress"
      title="Email"
      type="text"
      error="{$errors.emailAddress}"
      on:input="{handleInput}"
      on:change="{handleChange}"></js-input>
  </p>
  <p>
    <js-input
      name="password"
      title="Password"
      type="password"
      error="{$errors.password}"
      on:input="{handleInput}"
      on:change="{handleChange}"></js-input>
  </p>
  {#if $errors.general}
    <p>{@html $errors.general}</p>
  {/if}
  <p>
    <js-button>Sign in</js-button>
  </p>
</form>
