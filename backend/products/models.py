from django.db import models
from users.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=150, blank=False)
    description = models.CharField(max_length=500, blank=True)
    image = models.ImageField(null=True, blank=True, default='/product.jpg')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    off_sale = models.BooleanField(default=False)
    discount_percentage = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    def get_discounted_price(self):
        if self.off_sale:
            discount_amount = (self.price * self.discount_percentage) / 100
            discounted_price = self.price - discount_amount
            return discounted_price
        else:
            return self.price
