import * as React from 'react';
import styles from './SampleFormWithDialog.module.scss';
import { ISampleFormWithDialogProps } from './ISampleFormWithDialogProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton, Dialog, DialogFooter, DialogType, Label, PrimaryButton, TextField } from 'office-ui-fabric-react';
import { Web } from "@pnp/sp/presets/all";
// import { escape } from '@microsoft/sp-lodash-subset';
import "@pnp/sp/lists";
import "@pnp/sp/items";
export interface ISubmitFormStates {
  IStateItems: any;
  ProductName: any;
  ProductPrice: any;
  Company: any;
  showDialog: boolean;
}

export default class SampleFormWithDialog extends React.Component<ISampleFormWithDialogProps, ISubmitFormStates> {
  constructor(props: ISampleFormWithDialogProps, state: ISubmitFormStates) {
    super(props);
    this.state = {
      IStateItems: [],
      ProductName: "",
      ProductPrice: "",
      Company: "",
      showDialog: false,
    }
  }
  public async componentDidMount() {
    await this.FetchData();
  }
  public async FetchData() {
    let web = Web(this.props.siteurl);
    const items: any[] = await web.lists.getByTitle("Test4").items();
    console.log("28", items);
    this.setState({ IStateItems: items });
  }
  public async CreateData() {
    this.setState({ showDialog: true });
  }
  public async onSaveChanges() {
    let web = Web(this.props.siteurl);
    await web.lists.getByTitle("Test4").items.add({
      Title: this.state.ProductName,
      ProductPrice: this.state.ProductPrice,
      Company: this.state.Company
    }).then(i => {
      console.log(i);
    });
    alert("create successfully");
    this.setState({ ProductName: "", ProductPrice: "", Company: "", showDialog: false });
  }
  public onCancelChanges() {
    this.setState({ showDialog: false });
  }
  public render(): React.ReactElement<ISampleFormWithDialogProps> {


    return (
      <div>
        <form action="" className={styles.form} >
          <div>
            <Label className={styles['ms-Label']}>
              Product Name
            </Label>
            <TextField value={this.state.ProductName} className={styles['ms-TextField']} onChange={(ev, newPlan) => this.setState({ ProductName: newPlan })} />
          </div>
          <div>
            <Label className={styles['ms-Label']}>
              Product Price
            </Label>
            <TextField value={this.state.ProductPrice} className={styles['ms-TextField']} onChange={(ev, newPlan) => this.setState({ ProductPrice: newPlan })} />
          </div>
          <div>
            <Label className={styles['ms-Label']}>
              Company
            </Label>
            <TextField value={this.state.Company} className={styles['ms-TextField']} onChange={(ev, newPlan) => this.setState({ Company: newPlan })} />


          </div>

          <div>
            {/* <PrimaryButton text='Save' onClick={()=>this.CreateData()}></PrimaryButton> */}
            <PrimaryButton text='Submit Data' onClick={() => this.CreateData()} className={styles['ms-Button']}></PrimaryButton>
            {/* <DefaultButton text='Cancel' onClick={()=>this.setState({showDialog:true})}></DefaultButton> */}
          </div>
          <Dialog
            hidden={!this.state.showDialog}
            onDismiss={() => this.onCancelChanges()}
            dialogContentProps={{
              type: DialogType.normal,
              title: 'Do you want to save changes?',
              subText: 'Your changes will be saved permanently.'
            }}
            modalProps={{
              isBlocking: false,
            }}
          >
            <DialogFooter>
              <PrimaryButton onClick={() => this.onSaveChanges()} text="Save" className={styles['ms-Button']} />
              <DefaultButton onClick={() => this.onCancelChanges()} text="Cancel" className={styles['ms-Button']} />
            </DialogFooter>
          </Dialog>
        </form>
      </div>
    );
  }
}
