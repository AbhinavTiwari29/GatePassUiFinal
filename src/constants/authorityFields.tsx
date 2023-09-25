const AUTHORITY_FIELDS = [
    {
      id: "vendor_name",
      fieldName: "Vendor Name",
      type: "select",
      selectOptions: ["cipl1", "cipl2"],
    },
    { id: "authority_name", fieldName: "Authority Name", type: "input" },
    {
      id: "status",
      fieldName: "Status",
      type: "select",
      selectOptions: ["Active", "Non-Active"],
    },
    { id: "authority_letter", fieldName: "Authority Letter", type: "input" },
    { id: "expiry_date", fieldName: "Expiry Date", type: "date" },
  ]
  
  export default AUTHORITY_FIELDS
  