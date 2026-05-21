import React from "react";
import ShippingCountryField from "./country/ShippingCountryField";
import ShippingCityField from "./city/ShippingCityField";
import ShippingAddress1Field from "./address1/ShippingAddress1Field";
import ShippingAddress2Field from "./address2/ShippingAddress2Field";
import ShippingPostalCodeField from "./postal-code/ShippingPostalCodeField";
import ShippingNoteField from "./note/ShippingNoteField";

const ShippingFields = () => {
  return (
    <>
      <ShippingCountryField />
      <ShippingCityField />
      <ShippingAddress1Field />
      <ShippingAddress2Field />
      <ShippingPostalCodeField />
      <ShippingNoteField />
    </>
  );
};

export default ShippingFields;
