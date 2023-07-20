import { ChangeEvent, FormEvent } from 'react';
import { Select } from 'antd';
import { IProduct } from '../../functions/product';
import { ISub } from '../../functions/sub';

const { Option } = Select;

type Props = {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  setValues: React.Dispatch<React.SetStateAction<IProduct>>;
  values: IProduct;
  handleCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  subOptions: ISub[];
  showSub: boolean;
};

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
}: Props) => {
  const { title, description, price, categories, subs, quantity } = values;

  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const brands = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus'];
  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full">
      <div className="">
        <span className="formlabel">Title</span>
        <input
          type="text"
          name="title"
          className="forminput inputshadow "
          placeholder="Enter Product Name"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Description</span>
        <input
          type="text"
          name="description"
          className="forminput inputshadow "
          placeholder="Enter Product Description"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Price</span>
        <input
          type="Number"
          name="price"
          className="forminput inputshadow "
          placeholder="Enter Product Price"
          value={price}
          onChange={handleChange}
        />
      </div>

      {/* <div className="input-group mb-4">
                <label>Shipping</label>
                <select 
                    name="shipping" 
                    className="form-control"
                    placeholder='Enter Product Name'
                    onChange={handleChange}
                >
                    <option>Please Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>

                </select>
            </div> */}

      <div className="input-group mb-4">
        <span className="formlabel">Quantity</span>
        <input
          type="Number"
          name="quantity"
          className="forminput inputshadow "
          placeholder="Enter Product Quantity"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Color</span>
        <select
          name="color"
          className="forminput inputshadow"
          onChange={handleChange}
        >
          <option>Please Select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Brand</span>
        <select
          name="brand"
          className="forminput inputshadow"
          placeholder="Enter Product Name"
          onChange={handleChange}
        >
          <option>Please Select</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group mb-4">
        <span className="formlabel">Category</span>
        <select
          name="category"
          className="forminput inputshadow"
          placeholder="Enter Product Name"
          onChange={handleCategoryChange}
        >
          <option>Please Select</option>
          {categories!.length > 0 &&
            categories!.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {showSub && (
        <div className="input-group mb-4">
          <span className="formlabel">Sub-Category</span>
          <span className="form-control">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please Select"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </span>
        </div>
      )}

      <button type="submit" className="btn bg-prim hover:bg-primhigh">
        Submit
      </button>
    </form>
  );
};

export default ProductCreateForm;
