import h5py

model_path = 'fruit_veg_react.h5'  # Replace with your model's filename

with h5py.File(model_path, 'r+') as f:
    model_config = f.attrs.get('model_config')
    if isinstance(model_config, bytes):
        model_config = model_config.decode('utf-8')
    if '"groups": 1,' in model_config:
        model_config = model_config.replace('"groups": 1,', '')
        f.attrs.modify('model_config', model_config.encode('utf-8'))
        print("Removed 'groups': 1 from model_config.")
    else:
        print("'groups': 1 not found in model_config.")
