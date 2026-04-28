class OfferModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.imageUrl = data.image_url || '';
    this.createdAt = data.created_at || null;
  }

  // ✅ Convert to plain object for component use
  toJSON() {
    return {
      id: this.id,
      image: this.imageUrl, 
      createdAt: this.createdAt,
    };
  }

  static fromAPIResponse(response) {
    if (!response || !response.success || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.map(item => new OfferModel(item));
    
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
}

export default OfferModel;