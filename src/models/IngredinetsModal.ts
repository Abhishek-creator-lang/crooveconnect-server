import { database } from 'src/database';
import { Model} from './Model';


export class IngredinetsModal extends Model {
  static tableName = 'ingredients';
  
  private static get ingredinetsTable() {
    if (!this.tableName) {
      throw new Error('You must set a table name!');
    }
    console.log(this.tableName,'this.tableName')
    return database(this.tableName);
  }

  public static async ingredients(){
      const rawData = await this.ingredinetsTable.select(
        'ingredients.id as ingredient_id',
        'ingredients.name as ingredient_name',
        'ingredient_categories.id as category_id',
        'ingredient_categories.name as category_name'
      )
      .leftJoin(
        'ingredient_categories',
        'ingredients.category_id',
        'ingredient_categories.id'
      );
      console.log(rawData,'rawData')
      const groupedByCategory = rawData?.reduce((result, item) => {
        const { category_id, category_name, ingredient_id, ingredient_name } = item;
      
        // Check if the category already exists in the result
        if (!result[category_id]) {
          result[category_id] = {
            category_id,
            category_name,
            ingredients: [], // Initialize an empty ingredients array
          };
        }
      
        // Add the ingredient to the category's ingredients list
        result[category_id].ingredients.push({
          ingredient_id,
          ingredient_name,
        });
      
        return result;
      }, {});

      const response = Object.values(groupedByCategory);
     return response
  }
}
