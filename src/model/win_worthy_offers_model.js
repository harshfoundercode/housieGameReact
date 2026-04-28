/**
 * Offer Model - Individual offer ka data structure
 */
class OfferModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.imageUrl = data.image_url || '';
    this.createdAt = data.created_at || null;
  }

  // ✅ Check if offer has valid image
  hasValidImage() {
    return this.imageUrl && this.imageUrl.length > 0;
  }

  // ✅ Get formatted date
  getFormattedDate() {
    if (!this.createdAt) return '';
    return new Date(this.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // ✅ Convert to plain object for component use
  toJSON() {
    return {
      id: this.id,
      image: this.imageUrl,  // Component mein 'image' key use ho rahi hai
      createdAt: this.createdAt,
    };
  }

  // ✅ Static: Create single offer from API data
  static fromJSON(data) {
    return new OfferModel(data);
  }

  // ✅ Static: Create list of offers from API response
  static fromAPIResponse(response) {
    if (!response || !response.success || !Array.isArray(response.data)) {
      return [];
    }
    
    // Har object ko OfferModel mein convert karo
    return response.data.map(item => new OfferModel(item));
  }
}

export default OfferModel;