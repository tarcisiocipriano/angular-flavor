import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) shoppingListForm: NgForm;

  updateMode = false;

  ingredientSelected: Ingredient;

  ingredientSelectedIndex: number;

  subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe((index: number) => {
        this.updateMode = true;
        this.ingredientSelected = this.slService.getIngredient(index);
        this.ingredientSelectedIndex = index;

        this.shoppingListForm.setValue({
          name: this.ingredientSelected.name,
          amount: this.ingredientSelected.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.updateMode) {
      this.slService.updateIngredient(this.ingredientSelectedIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.clearForm();
  }

  onDelete() {
    this.slService.deleteIngredient(this.ingredientSelectedIndex);
    this.clearForm();
  }

  clearForm() {
    this.updateMode = false;
    this.shoppingListForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
