import { AbstractLevelDOWN } from 'abstract-leveldown';
import levelup, { LevelUp } from 'levelup';
import MemDownConstructor from 'memdown';

/** An alias for the type used in the UserProfile interface */
export type StringDb = LevelUp<AbstractLevelDOWN<string, string>>;

export class Db {
  private db: StringDb =
    process.env.NODE_ENV === 'test' ? this.createMemDb() : this.createBrowserDb('bs-persona');

  private createMemDb(): StringDb {
    return levelup(MemDownConstructor<string, string>());
  }

  private createBrowserDb(name: string): StringDb {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const leveljs = require('level-js');
    return levelup(leveljs(name));
  }

  public async hasPersona(): Promise<boolean> {
    // Constant from IOV-Core source code. Would be good to have a proper API for that
    const storageKeyFormatVersion = 'format_version';

    try {
      await this.db.get(storageKeyFormatVersion);
      return true;
    } catch (_) {
      return false;
    }
  }

  public getDb(): StringDb {
    return this.db;
  }
}