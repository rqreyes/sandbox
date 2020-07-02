import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface iSettingsProps {
  settings: iSettings;
  setSettings: Dispatch<SetStateAction<iSettings>>;
  handleReset: () => void;
  handleSave: () => void;
}

const Settings: React.FC<iSettingsProps> = ({
  settings,
  setSettings,
  handleReset,
  handleSave,
}) => {
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [evt.currentTarget.name]: evt.currentTarget.value,
    });
  };

  return (
    <section className='settings'>
      <h2>Settings</h2>
      <div className='settings-content'>
        <form>
          <h3>Piece Shape</h3>
          <div className='radio-group'>
            <label>
              <Input
                type='radio'
                name='shape'
                value='circle'
                onChange={handleChange}
                defaultChecked={settings.shape === 'circle'}
              />
              Circle
            </label>
            <label>
              <Input
                type='radio'
                name='shape'
                value='square'
                onChange={handleChange}
                defaultChecked={settings.shape === 'square'}
              />
              Square
            </label>
          </div>
          <h3>Piece Theme</h3>
          <div className='radio-group'>
            <label>
              <Input
                type='radio'
                name='theme'
                value='fire'
                onChange={handleChange}
                defaultChecked={settings.theme === 'fire'}
              />
              Fire
            </label>
            <label>
              <Input
                type='radio'
                name='theme'
                value='wood'
                onChange={handleChange}
                defaultChecked={settings.theme === 'wood'}
              />
              Wood
            </label>
          </div>
        </form>
        <div className='button-group'>
          <h3>Actions</h3>
          <Button type='submit' onClick={handleSave}>
            Save
          </Button>
          <Button className='reset' type='submit' onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
