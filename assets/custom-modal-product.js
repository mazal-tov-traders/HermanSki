document.addEventListener('DOMContentLoaded', () => {
    const quickViewButtons = document.querySelectorAll('.product-card__quick-view');
    const modal = document.querySelector('.buy-now-curd-product');
    const closeButton = modal.querySelector('.quick-view-close');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const productCard = button.closest('.product-card');
            const jsonData = productCard.querySelector('.card__content-resource');
            const productData = JSON.parse(jsonData.textContent);

            modal.querySelector('.quick-view-product-image').src = productData.featured_media;
            modal.querySelector('.quick-view-product-image').alt = productData.title;

            const badge = modal.querySelector('.quick-view-badge');
            if (productData.badge_image) {
                badge.src = productData.badge_image;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }

            modal.querySelector('.quick-view-vendor').textContent = productData.vendor;
            modal.querySelector('.quick-view-title').textContent = productData.title;

            const tagsContainer = modal.querySelector('.quick-view-tags');
            tagsContainer.innerHTML = '';
            productData.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'quick-view-tag';
                tagSpan.textContent = tag;
                tagsContainer.appendChild(tagSpan);
            });

            const ratingContainer = modal.querySelector('.rating-stars');
            ratingContainer.innerHTML = '';
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('span');
                star.className = i <= productData.rating ?
                    'product-card__rating-star product-card__rating-star--filled' :
                    'product-card__rating-star';
                star.innerHTML = i <= productData.rating ? `{% render 'rating-star-filled' %}` : `{%- render 'rating-star' -%}`;
                ratingContainer.appendChild(star);
            }

            modal.querySelector('.review-count').textContent =
                `${productData.reviews_count} REVIEWS`;

            modal.querySelector('.quick-view-description').textContent = productData.description;

            const oldPrice = modal.querySelector('.quick-view-price-old');
            if (productData.comparePrice && productData.comparePrice > productData.price) {
                oldPrice.textContent = productData.comparePrice;
                oldPrice.style.display = 'block';
            } else {
                oldPrice.style.display = 'none';
            }

            modal.querySelector('.quick-view-price').textContent = productData.price;

            const form = modal.querySelector('.form');
            const variantInput = form.querySelector('.product-variant-id');
            const productInput = form.querySelector('input[name="product-id"]');
            variantInput.value = productData.variant_id;
            productInput.value = productData.id;

            const moreDetailsButton = modal.querySelector('.custom-quick-view-more-details');
            moreDetailsButton.href = productData.url;

            const quantityInput = modal.querySelector('.quantity__input');
            quantityInput.value = 1;

            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const productForm = modal.querySelector('.form');
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(productForm);

        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                modal.style.display = 'none';
                document.dispatchEvent(new Event('cart:updated'));
            } else {
                throw new Error('Ошибка добавления в корзину');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});