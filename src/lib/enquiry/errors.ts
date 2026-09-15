export class EnquiryNotConfiguredError extends Error {
  constructor() {
    super("No project enquiry delivery provider is configured.");
    this.name = "EnquiryNotConfiguredError";
  }
}
