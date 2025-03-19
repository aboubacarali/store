import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Product, ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-admin-product-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-product-form.component.html',
  styleUrl: './admin-product-form.component.css'
})
export class AdminProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  isEditMode = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],  // Ajout du champ description
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [false, Validators.required], // Ajout du stock (true/false)
      image: ['', Validators.required]
    });

    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEditMode = true;
      this.productService.getProductById(this.productId).subscribe(product => {
        this.productForm.patchValue(product);
      });
    }
  }

  saveProduct() {
    if (this.productForm.invalid) return;

    const productData: Product = this.productForm.value;

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, productData).subscribe(() => {
        this.router.navigate(['/admin/products'], { queryParams: { id: this.productId } });
      });
    } else {
      this.productService.createProduct(productData).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }

}
