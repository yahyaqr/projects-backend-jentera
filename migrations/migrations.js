/* eslint-disable quotes */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // create the rpm table
  pgm.createTable('rpm', {
    timestamp: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    device_id: { type: 'varchar(10)', notNull: true },
    rpm: { type: 'float', notNull: true },
    primary_key: { type: 'string', notNull: true },
  });

  // create the trigger function to set the default value of the primary key column
  pgm.createFunction(
    'set_rpm_primary_key',
    [],
    {
      replace: true,
      returns: 'trigger',
      language: 'plpgsql',
    },
    `
      BEGIN
        NEW.primary_key := CONCAT(NEW.device_id, '_', NEW.timestamp);
        RETURN NEW;
      END;
      `,
  );

  // attach the trigger function to the rpm table
  pgm.createTrigger('rpm', 'set_primary_key_trigger', {
    when: 'BEFORE',
    operation: 'INSERT',
    level: 'ROW',
    function: 'set_rpm_primary_key',
  });

  // create the vibration table
  pgm.createTable('vibration', {
    timestamp: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    device_id: { type: 'varchar(10)', notNull: true },
    vibration: { type: 'float', notNull: true },
    primary_key: { type: 'string', notNull: true },
  });

  // create the trigger function to set the default value of the primary key column
  pgm.createFunction(
    'set_vibration_primary_key',
    [],
    {
      replace: true,
      returns: 'trigger',
      language: 'plpgsql',
    },
    `
    BEGIN
      NEW.primary_key := CONCAT(NEW.device_id, '_', NEW.timestamp);
      RETURN NEW;
    END;
    `,
  );

  // attach the trigger function to the vibration table
  pgm.createTrigger('vibration', 'set_primary_key_trigger', {
    when: 'BEFORE',
    operation: 'INSERT',
    level: 'ROW',
    function: 'set_vibration_primary_key',
  });
};

exports.down = (pgm) => {
  pgm.dropTable('rpm');
  pgm.dropTable('vibration');
};
