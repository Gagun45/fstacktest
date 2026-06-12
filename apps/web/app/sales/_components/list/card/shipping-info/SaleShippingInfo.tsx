import { ISaleOrder } from "@repo/shared";

interface Props {
  shippingInfo: ISaleOrder["shippingInfo"];
}

const SaleShippingInfo = ({ shippingInfo }: Props) => {
  const {
    customerName,
    customerEmail,
    customerPhone,
    shippingCountry,
    shippingCity,
    shippingAddress1,
    shippingAddress2,
    shippingPostalCode,
    shippingNote,
  } = shippingInfo;

  return (
    <div className="flex flex-col gap-1 text-sm">
      <p>
        <span className="font-medium">Customer:</span> {customerName}
      </p>

      <p>
        <span className="font-medium">Email:</span> {customerEmail}
      </p>

      {customerPhone && (
        <p>
          <span className="font-medium">Phone:</span> {customerPhone}
        </p>
      )}

      <p>
        <span className="font-medium">Address:</span> {shippingAddress1}
        {shippingAddress2 && `, ${shippingAddress2}`}
      </p>

      <p>
        <span className="font-medium">City:</span> {shippingCity}
      </p>

      <p>
        <span className="font-medium">Country:</span> {shippingCountry}
      </p>

      {shippingPostalCode && (
        <p>
          <span className="font-medium">Postal code:</span> {shippingPostalCode}
        </p>
      )}

      {shippingNote && (
        <p>
          <span className="font-medium">Note:</span> {shippingNote}
        </p>
      )}
    </div>
  );
};

export default SaleShippingInfo;
