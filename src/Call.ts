class Call {
  private method: string;
  private hasWithValue = false;
  private withValue: unknown[] | undefined;
  private error: Error | undefined;
  private hasReturnSelfValue = false;
  private hasReturnValue = false;
  private returnValue: any;
  private returnCallbackValue: Function | undefined;

  private constructor(method: string) {
    this.method = method;
  }

  public static create(method: string): Call {
    return new Call(method);
  }

  public with(...withValue: unknown[]): Call {
    this.hasWithValue = true;
    this.withValue = withValue;
    return this;
  }

  public willThrowError(error: Error): Call {
    this.checkForExistingReturnValues('willThrowError');
    this.error = error;
    return this;
  }

  public willReturnSelf(): Call {
    this.checkForExistingReturnValues('willReturnSelf');
    this.hasReturnSelfValue = true;
    return this;
  }

  public willReturn(returnValue: any): Call {
    this.checkForExistingReturnValues('willReturn');
    this.hasReturnValue = true;
    this.returnValue = returnValue;
    return this;
  }

  public willReturnCallback(returnCallback: Function): Call {
    this.checkForExistingReturnValues('willReturnCallback');
    this.returnCallbackValue = returnCallback;
    return this;
  }

  private checkForExistingReturnValues(method: string): void {
    if (this.error) {
      throw new Error(`${method}: There is already an error`);
    }

    if (this.hasReturnSelfValue) {
      throw new Error(`${method}: There is already a return self`);
    }

    if (this.hasReturnValue) {
      throw new Error(`${method}: There is already a return value`);
    }

    if (this.returnCallbackValue) {
      throw new Error(`${method}: There is already a return callback`);
    }
  }

  public getMethod(): string {
    return this.method;
  }

  public hasWith(): boolean {
    return this.hasWithValue;
  }

  public hasReturnSelf(): boolean {
    return this.hasReturnSelfValue;
  }

  public hasReturn(): boolean {
    return this.hasReturnValue;
  }

  public getWith(): unknown[] | undefined {
    return this.withValue;
  }

  public getError(): Error | undefined {
    return this.error;
  }

  public getReturn(): any {
    return this.returnValue;
  }

  public getReturnCallback(): Function | undefined {
    return this.returnCallbackValue;
  }
}

export default Call;
